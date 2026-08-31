import {
  CreateContactCommand,
  CreateContactListCommand,
  DeleteContactCommand,
  GetContactCommand,
  GetContactListCommand,
  ListContactListsCommand,
  UpdateContactCommand,
} from "@aws-sdk/client-sesv2";
import { getSes } from "./mailer";

const DEFAULT_LIST = "botanical-bytes";

function errorName(error: unknown): string {
  return error instanceof Error ? error.name : "";
}

let resolvedList: Promise<string> | null = null;

/**
 * SES erlaubt genau eine Kontaktliste pro Account und Region. Wir legen unsere
 * beim ersten Zugriff an; existiert bereits eine (z. B. aus einem anderen
 * TFLIT-Projekt), nutzen wir die mit, statt am Limit zu scheitern.
 */
async function contactList(): Promise<string> {
  resolvedList ??= (async () => {
    const ses = getSes();
    if (!ses) throw new Error("AWS SES is not configured");
    const name = process.env.SES_CONTACT_LIST ?? DEFAULT_LIST;

    try {
      await ses.send(new GetContactListCommand({ ContactListName: name }));
      return name;
    } catch (error) {
      if (errorName(error) !== "NotFoundException") throw error;
    }

    try {
      await ses.send(new CreateContactListCommand({ ContactListName: name }));
      return name;
    } catch (error) {
      if (errorName(error) !== "LimitExceededException") throw error;
    }

    const lists = await ses.send(new ListContactListsCommand({}));
    const existing = lists.ContactLists?.[0]?.ContactListName;
    if (!existing) throw new Error("no SES contact list available");
    console.warn(
      `[newsletter] Kontaktliste "${name}" nicht anlegbar, nutze vorhandene "${existing}".`,
    );
    return existing;
  })();

  try {
    return await resolvedList;
  } catch (error) {
    resolvedList = null; // beim nächsten Request neu versuchen
    throw error;
  }
}

export async function isSubscribed(email: string): Promise<boolean> {
  const ses = getSes();
  if (!ses) return false;
  try {
    const contact = await ses.send(
      new GetContactCommand({
        ContactListName: await contactList(),
        EmailAddress: email,
      }),
    );
    return contact.UnsubscribeAll !== true;
  } catch (error) {
    if (errorName(error) === "NotFoundException") return false;
    throw error;
  }
}

export async function subscribe(email: string): Promise<void> {
  const ses = getSes();
  if (!ses) throw new Error("AWS SES is not configured");
  const ContactListName = await contactList();
  try {
    await ses.send(
      new CreateContactCommand({
        ContactListName,
        EmailAddress: email,
        UnsubscribeAll: false,
      }),
    );
  } catch (error) {
    if (errorName(error) !== "AlreadyExistsException") throw error;
    // Wieder-Anmeldung nach einer früheren Abmeldung.
    await ses.send(
      new UpdateContactCommand({
        ContactListName,
        EmailAddress: email,
        UnsubscribeAll: false,
      }),
    );
  }
}

/**
 * Abmeldung löscht den Kontakt — so steht es in der Datenschutzerklärung
 * ("die Adresse wird dann gelöscht"). Ein unbekannter Kontakt gilt als Erfolg.
 */
export async function unsubscribe(email: string): Promise<void> {
  const ses = getSes();
  if (!ses) throw new Error("AWS SES is not configured");
  try {
    await ses.send(
      new DeleteContactCommand({
        ContactListName: await contactList(),
        EmailAddress: email,
      }),
    );
  } catch (error) {
    if (errorName(error) !== "NotFoundException") throw error;
  }
}

import { type User, type InsertUser, type Contact, type InsertContact, type CvFile, type InsertCvFile, users, contacts, cvFiles } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  markContactAsRead(id: string): Promise<void>;
  
  createCvFile(cvFile: InsertCvFile): Promise<CvFile>;
  getActiveCvFile(): Promise<CvFile | undefined>;
  deactivateAllCvFiles(): Promise<void>;
  activateCvFile(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private cvFiles: Map<string, CvFile>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.cvFiles = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
      isRead: false,
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async markContactAsRead(id: string): Promise<void> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.isRead = true;
      this.contacts.set(id, contact);
    }
  }

  async createCvFile(insertCvFile: InsertCvFile): Promise<CvFile> {
    const id = randomUUID();
    const cvFile: CvFile = {
      ...insertCvFile,
      id,
      uploadedAt: new Date(),
      isActive: false, // Will be activated separately
    };
    this.cvFiles.set(id, cvFile);
    return cvFile;
  }

  async getActiveCvFile(): Promise<CvFile | undefined> {
    return Array.from(this.cvFiles.values()).find(cv => cv.isActive);
  }

  async deactivateAllCvFiles(): Promise<void> {
    Array.from(this.cvFiles.entries()).forEach(([id, cvFile]) => {
      cvFile.isActive = false;
      this.cvFiles.set(id, cvFile);
    });
  }

  async activateCvFile(id: string): Promise<void> {
    await this.deactivateAllCvFiles();
    const cvFile = this.cvFiles.get(id);
    if (cvFile) {
      cvFile.isActive = true;
      this.cvFiles.set(id, cvFile);
    }
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async markContactAsRead(id: string): Promise<void> {
    await db
      .update(contacts)
      .set({ isRead: true })
      .where(eq(contacts.id, id));
  }

  async createCvFile(insertCvFile: InsertCvFile): Promise<CvFile> {
    const [cvFile] = await db
      .insert(cvFiles)
      .values(insertCvFile)
      .returning();
    return cvFile;
  }

  async getActiveCvFile(): Promise<CvFile | undefined> {
    const [cvFile] = await db
      .select()
      .from(cvFiles)
      .where(eq(cvFiles.isActive, true))
      .limit(1);
    return cvFile || undefined;
  }

  async deactivateAllCvFiles(): Promise<void> {
    await db
      .update(cvFiles)
      .set({ isActive: false });
  }

  async activateCvFile(id: string): Promise<void> {
    await this.deactivateAllCvFiles();
    await db
      .update(cvFiles)
      .set({ isActive: true })
      .where(eq(cvFiles.id, id));
  }
}

export const storage = new DatabaseStorage();

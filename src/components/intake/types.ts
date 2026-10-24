export type BirdBucket = "under500" | "500to2k" | "2kto10k" | "10kplus";
export type WhoLogs = "me" | "manager" | "attendants";
export type Relationship =
  | "owner_runs"
  | "owner_manager"
  | "owner_absent"
  | "adviser";

export const RELATIONSHIP_OPTIONS: { value: Relationship; label: string }[] = [
  { value: "owner_runs", label: "I own it and run it" },
  { value: "owner_manager", label: "I own it, a manager runs it" },
  { value: "owner_absent", label: "I own it but rarely visit" },
  { value: "adviser", label: "I advise it" },
];

export const BIRD_OPTIONS: { value: BirdBucket; label: string }[] = [
  { value: "under500", label: "Under 500" },
  { value: "500to2k", label: "500 to 2,000" },
  { value: "2kto10k", label: "2,000 to 10,000" },
  { value: "10kplus", label: "10,000+" },
];

export const WHO_OPTIONS: { value: WhoLogs; label: string }[] = [
  { value: "me", label: "Me" },
  { value: "manager", label: "Manager" },
  { value: "attendants", label: "Attendants" },
];

export type IntakeValues = {
  name: string;
  phone: string;
  email: string;
  farm: string;
  birds: BirdBucket | null;
  who: WhoLogs[];
  // Optional. Absent is a valid answer and must stay that way: this exists so a
  // consultant advising farms is not forced to answer as an owner.
  relationship: Relationship | null;
};

export type IntakeField = keyof IntakeValues;

export type Touched = Partial<Record<IntakeField, boolean>>;

export type IntakeAnswers = {
  wish: string;
};

export type IntakePayload =
  | { kind: "intake"; values: IntakeValues }
  | { kind: "answers"; values: IntakeValues; answers: IntakeAnswers };

export type SubmitResult = { ok: true } | { ok: false; error: string };

export const emptyValues: IntakeValues = {
  name: "",
  phone: "",
  email: "",
  farm: "",
  birds: null,
  who: [],
  relationship: null,
};

export const emptyAnswers: IntakeAnswers = {
  wish: "",
};

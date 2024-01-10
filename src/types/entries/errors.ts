class AysAgroError extends Error {
  status: number;
  details?: Array<ЕrrorFieldDetailEntry>;

  constructor(message: string, status: number, details?: Array<ЕrrorFieldDetailEntry>) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export class ЕrrorFieldDetailEntry {
  field: string;
  message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}

export default AysAgroError;

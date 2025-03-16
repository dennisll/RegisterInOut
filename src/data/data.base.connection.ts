

export interface Options {
    url?: string;
    dbName?: string;
}

export abstract class DataBaseConnection {

    abstract connect(): Promise<void>;
}
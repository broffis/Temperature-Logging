export type FridgeProps = {
  _id?: string;
  name: string;
  location: {
    location: string;
  };
  tempLogs: TempLog[];
}

export type FridgeCardProps = {
  name: string;
  id: string;
  location: string;
  latestTemp?: TempLog;
}

export type TempLog = {
  temperature?: number;
  logTime: string;
}

export type Location = {
  location: string;
}

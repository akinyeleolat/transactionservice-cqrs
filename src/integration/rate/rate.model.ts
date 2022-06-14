export class RateResponse {
  status!: boolean;
  statusCode!: string;
  message!: string;
  data: Rate | undefined;
}

export class Rate {
  amount!: string;
  currency!: string;
  from!: string;
}

import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type OrderDetails = {
  email: string;
  name: string;
  phone: string;
  address: string;
  orderItems: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request are allowed" });
  }

  const body = req.body as OrderDetails;

  try {
    //Prepare Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYRNfVBlq/iz9x\nMQ6D0YIuX4DQaKGAELEq+Pfe6xVe1meMBuiFLWx2Rb0YXED0rqHZOAiZ9gX6Jhth\nKKRKNY6+HK4WFWUtRVaGrQ5vRTDeTWPQDetFtO10XYNjpkLekvttgPtBZQo7k0Re\nzN/j1/xdrinQeusmzijvglC4l+1DgJ1tkzCCk7cZpbZulVrE6lSEmmvkATCZRNhL\nHZKnt3XKCvNbpgHszO5rF0Amlmc29nFMk8TaA48essrno+iEKYsatlXDDJhvoqxb\n6+LjxaY6muNgGWiDOpWAQBxvH0ZfCf/lkLrte3q2/Vv8XTZuK7yfX9sRFrgxNowK\nyareFqefAgMBAAECggEAS0giE2KgZDoCpEJWRErFW4sBI0jPrALUrQPJfM9qUeib\n6imSNSHXkYP6MPyPasmaIExpSEFQBDRp7ffLfhsLlyeT1DxAuQiidlRCIjYpqobF\nldwD2YNRsOn450AQqH0vzJxr3JGJZRnywBH3kWy8C07rwnS7JQThTUT3BsSqW+gL\nunVthEAyV/kOBhPmX9/JvzLu8FrZoUBmosxlW23vpoJwG9G0NquN+l4XHqxeMxbn\n9skpcehWy4vytYJDMrOY168zTY29IwuV/xVz6UcqJeDNJvwlGeF5kOkJ9+doQyWm\nLAIX2tzO0yWWJUz/UevV2XUfJ3NBXVY0eGs8+NpetQKBgQDPENC1HnjttF7FIQvV\n6Hs+75Y00yyU4kPyT85nCYZtu56Ay36sXOXoQIdWfn71lwBG2jl3PoRLqDiBRTCU\n4kc0Bn7ebKZilvQd26hM46Z6OSPutf3iRMuTJWAKe1M+/FwjGQe8ZLr1XGr5KrMP\nIPARdRkhqVfD+m9nhCFH8sBmOwKBgQC8QOZmSE7FDH3twBmyyF9RMbqQ6YJxe+GN\ndG7rNiB6gDgZcHPw18RBURUR8u7CY0s+8qt1hKI7Lf0/GFv9Zgtpl6m/lcGI9BKJ\nsSetGMqoKeDFlbuXY3jozvU8zZrsc3MOyVlXXS9zmteWYIPjf0CTrXBWVO1AJQEc\n5ZC3XPDZ7QKBgDgAp0HlHPXFS8BrIKVY/ERYTjq5Rpx52cCmfv91Hwt8q/DPmNIL\nSg8XrMLi8XmAvo1rJhGvMd64f5fO28XYsUNL4nJL1nBhvWJ57znkdDkoTSSZyjGx\nQ5HnkOMk2a32WQERGvuEDuCffzsmpkkYMnW2QvbMszUI/ap0nP+1kv3TAoGAOS6x\njZIbMymnOsemRrMsmNo1JH15nQUXL0OVyaaoWO2HnNqWrSqtN3Xso4YaVjuZCKbn\nxAukx7sheL/qeV88yjdCXaqcngAdfWutdJvaOxh1aS8hS0vw1y6+OVju3TH4Wh55\nH9tzZXc8UzY/+aOWtwTw4ZhsdJaI7wEgY0I8+sUCgYEAkP9JI7wQX3BQiK9OE3Ym\n5daCT4j70YooIWIqqZuhyDHH3k7LUBd9iJ206bdIZFHDR3QZKUxIGfsAeEy5wGdH\n1o+GsRVAR4O75WfNiEG8wziTyqAZEMqHKAjl+B67so5bpRrRPiEJ8e3HdTWfGkOE\nkuYg/5uiMZpQloNPrPwqQks=\n-----END PRIVATE KEY-----\n"?.replace(
            /\\n/g,
            "\n"
          ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:E1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [body.email, body.name, body.phone, body.address, body.orderItems],
        ],
      },
    });

    return res.status(200).json({
      data: response.data,
    });
  } catch (error: any) {
    return res
      .status(500)
      .send({ message: error.message ?? "Something went wrong" });
  }
}

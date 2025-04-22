import { privateApi } from "@/config/api";
import type { RequestParams, ServiceResponse } from "../types";
import { paymentStatus } from "./constants";
import {
  type CreatePaymentRequest,
  type DeletePaymentRequest,
  type PaymentResponse,
} from "./types";

export const getPaymentsDetail = async (paymentId: string) => {
  return privateApi.get<ServiceResponse<PaymentResponse>>(`payments/${paymentId}`);
};

export const getPaymentsList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<PaymentResponse[]>> => {
  const sleep = (ms: number) => {
    return new Promise((resolve) => {
      return setTimeout(resolve, ms);
    });
  };

  await sleep(500);

  const MOCK_DATA: PaymentResponse[] = [
    // cspell:disable
    { id: "1", amount: 923, status: paymentStatus.success, email: "brian24@filterme.com" },
    { id: "2", amount: 430, status: paymentStatus.processing, email: "michael62@filterme.com" },
    { id: "3", amount: 312, status: paymentStatus.failed, email: "ashley19@filterme.com" },
    { id: "4", amount: 751, status: paymentStatus.success, email: "robert55@filterme.com" },
    { id: "5", amount: 880, status: paymentStatus.processing, email: "jessica47@filterme.com" },
    { id: "6", amount: 203, status: paymentStatus.failed, email: "david77@filterme.com" },
    { id: "7", amount: 670, status: paymentStatus.success, email: "jason36@filterme.com" },
    { id: "8", amount: 409, status: paymentStatus.processing, email: "lisa52@filterme.com" },
    { id: "9", amount: 587, status: paymentStatus.failed, email: "mark89@filterme.com" },
    { id: "10", amount: 320, status: paymentStatus.success, email: "susan61@filterme.com" },
    { id: "11", amount: 900, status: paymentStatus.processing, email: "daniel33@filterme.com" },
    { id: "12", amount: 500, status: paymentStatus.failed, email: "steven82@filterme.com" },
    { id: "13", amount: 411, status: paymentStatus.success, email: "karen45@filterme.com" },
    { id: "14", amount: 780, status: paymentStatus.processing, email: "charles74@filterme.com" },
    { id: "15", amount: 230, status: paymentStatus.failed, email: "nancy59@filterme.com" },
    { id: "16", amount: 545, status: paymentStatus.success, email: "patrick91@filterme.com" },
    { id: "17", amount: 810, status: paymentStatus.processing, email: "julia48@filterme.com" },
    { id: "18", amount: 299, status: paymentStatus.failed, email: "matthew63@filterme.com" },
    { id: "19", amount: 650, status: paymentStatus.success, email: "victor39@filterme.com" },
    { id: "20", amount: 378, status: paymentStatus.processing, email: "elizabeth84@filterme.com" },
    { id: "21", amount: 712, status: paymentStatus.failed, email: "frank66@filterme.com" },
    { id: "22", amount: 405, status: paymentStatus.success, email: "deborah78@filterme.com" },
    { id: "23", amount: 822, status: paymentStatus.processing, email: "george57@filterme.com" },
    { id: "24", amount: 150, status: paymentStatus.failed, email: "kevin29@filterme.com" },
    { id: "25", amount: 603, status: paymentStatus.success, email: "paul92@filterme.com" },
    { id: "26", amount: 950, status: paymentStatus.processing, email: "kimberly71@filterme.com" },
    { id: "27", amount: 287, status: paymentStatus.failed, email: "ryan68@filterme.com" },
    { id: "28", amount: 430, status: paymentStatus.success, email: "gregory40@filterme.com" },
    { id: "29", amount: 789, status: paymentStatus.processing, email: "sharon85@filterme.com" },
    { id: "30", amount: 520, status: paymentStatus.failed, email: "andrew60@filterme.com" },
    { id: "31", amount: 345, status: paymentStatus.success, email: "peter93@filterme.com" },
    { id: "32", amount: 701, status: paymentStatus.processing, email: "michelle58@filterme.com" },
    { id: "33", amount: 670, status: paymentStatus.failed, email: "brandon86@filterme.com" },
    { id: "34", amount: 234, status: paymentStatus.success, email: "linda80@filterme.com" },
    { id: "35", amount: 889, status: paymentStatus.processing, email: "timothy37@filterme.com" },
    { id: "36", amount: 260, status: paymentStatus.failed, email: "dennis50@filterme.com" },
    { id: "37", amount: 604, status: paymentStatus.success, email: "rebecca75@filterme.com" },
    { id: "38", amount: 918, status: paymentStatus.processing, email: "larry83@filterme.com" },
    { id: "39", amount: 325, status: paymentStatus.failed, email: "nicholas42@filterme.com" },
    { id: "40", amount: 410, status: paymentStatus.success, email: "helen76@filterme.com" },
    { id: "41", amount: 785, status: paymentStatus.processing, email: "adam64@filterme.com" },
    { id: "42", amount: 543, status: paymentStatus.failed, email: "ronald46@filterme.com" },
    { id: "43", amount: 678, status: paymentStatus.success, email: "cynthia87@filterme.com" },
    { id: "44", amount: 800, status: paymentStatus.processing, email: "barbara41@filterme.com" },
    { id: "45", amount: 370, status: paymentStatus.failed, email: "edward56@filterme.com" },
    { id: "46", amount: 495, status: paymentStatus.success, email: "terry98@filterme.com" },
    { id: "47", amount: 745, status: paymentStatus.processing, email: "benjamin90@filterme.com" },
    { id: "48", amount: 312, status: paymentStatus.failed, email: "betty67@filterme.com" },
    { id: "49", amount: 549, status: paymentStatus.success, email: "donald70@filterme.com" },
    { id: "50", amount: 876, status: paymentStatus.processing, email: "stephanie51@filterme.com" },
    { id: "51", amount: 421, status: paymentStatus.failed, email: "gerald65@filterme.com" },
    { id: "52", amount: 620, status: paymentStatus.success, email: "rachel88@filterme.com" },
    { id: "53", amount: 940, status: paymentStatus.processing, email: "anthony30@filterme.com" },
    { id: "54", amount: 289, status: paymentStatus.failed, email: "angela79@filterme.com" },
    { id: "55", amount: 670, status: paymentStatus.success, email: "justin43@filterme.com" },
    { id: "56", amount: 800, status: paymentStatus.processing, email: "anna97@filterme.com" },
    { id: "57", amount: 367, status: paymentStatus.failed, email: "christopher32@filterme.com" },
    { id: "58", amount: 570, status: paymentStatus.success, email: "kathleen99@filterme.com" },
    { id: "59", amount: 830, status: paymentStatus.processing, email: "jeffrey35@filterme.com" },
    { id: "60", amount: 478, status: paymentStatus.failed, email: "jacob28@filterme.com" },
    // cspell:enable
  ];

  let data = MOCK_DATA;

  if (searchText) {
    data = MOCK_DATA.filter(({ email }) => {
      return email.toLowerCase().includes((searchText ?? "").toLowerCase());
    });
  }

  if (pageSize) {
    const startIndex = ((page ?? 1) - 1) * pageSize;

    const slicedData = data.slice(startIndex, startIndex + pageSize);

    return Promise.resolve({
      data: slicedData,
      pagination: {
        total: data.length,
        currentPage: page ?? 1,
        totalPages: Math.ceil(data.length / pageSize),
        perPage: pageSize,
        links: { next: "", previous: "" },
        count: slicedData.length,
      },
      status: 200,
      success: true,
    });
  }

  return Promise.resolve({ data, status: 200, success: true });

  // TODO: return privateApi.get<ServiceResponse<Payment[]>>('payments', { params });
};

export const createPayment = async (payment: CreatePaymentRequest) => {
  return privateApi.post<ServiceResponse<PaymentResponse>>("payments", payment);
};

export const deletePayment = async ({ id }: DeletePaymentRequest) => {
  return await new Promise((resolve) => {
    return setTimeout(() => {
      return resolve(id);
    }, 1000);
  });
};

import { api } from '@/services/api';
import { NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';

function sleep(delay: number) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();

  try {
    const response = await api.post(`/users/${params.slug}/sign-up`, body);

    return NextResponse.json({ ...response.data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { message },
      } = error.response as AxiosResponse;

      sleep(1500);
      return new Response(JSON.stringify(message), {
        status,
        statusText,
      });
    }
  }
}

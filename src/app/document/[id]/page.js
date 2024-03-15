"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Document from '@/components/document';

export default function DocumentPage() {
  
  const pathname = useParams();
  return <Document id={pathname.id} />;
}

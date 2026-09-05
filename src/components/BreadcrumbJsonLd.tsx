import JsonLd from "@/components/JsonLd";
import { buildBreadcrumb } from "@/lib/entity";

export default function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  return <JsonLd data={buildBreadcrumb(items)} />;
}

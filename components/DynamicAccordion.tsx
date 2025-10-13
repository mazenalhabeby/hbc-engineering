"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string | React.ReactNode;
  answer: string | React.ReactNode;
  value: string;
}

interface DynamicAccordionProps {
  items: FAQItem[];
  defaultValue?: string;
}

export function DynamicAccordion({
  items,
  defaultValue,
}: DynamicAccordionProps) {
  return (
    <Accordion
      type={"single"}
      collapsible
      defaultValue={defaultValue}
      className="w-full"
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="text-lg font-semibold">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 text-balance text-slate-600">
            {typeof item.answer === "string" ? (
              <p>{item.answer}</p>
            ) : (
              item.answer
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

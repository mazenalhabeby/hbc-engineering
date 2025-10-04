import React from "react";
import { DynamicAccordion } from "./DynamicAccordion";

type faqItems =
  | {
      value: string;
      question: string;
      answer: string;
    }
  | {
      value: string;
      question: string;
      answer: React.JSX.Element;
    };

interface FAQProps {
  title: string;
  faqItems: faqItems[];
}
const FAQ = ({ title, faqItems }: FAQProps) => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6">
        {title}
      </h2>
      <div className="bg-slate-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow">
        <DynamicAccordion items={faqItems} defaultValue="faq-1" />
      </div>
    </section>
  );
};

export default FAQ;

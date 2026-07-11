"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Container from "../shared/Container";

const faqs = [
  {
    question: "How do I book an event?",
    answer:
      "Select an event, choose your ticket quantity, and complete checkout with Stripe.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, up to 48 hours before the event start time — see our Refund Policy for full details.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes, all payments are processed directly through Stripe; Venuo never stores your card details.",
  },
  {
    question: "How do I list my own event?",
    answer:
      "Create an account, choose \"organizer\" on signup, then use \"Create Event\" from your dashboard.",
  },
  {
    question: "Do you support free events?",
    answer:
      "Yes — set the price to 0 and attendees can reserve a spot with no payment step.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-surface py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">FAQ</span>
          <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
            Everything you need to know
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-xl border border-border bg-card">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground">{faq.question}</span>
                  <FiChevronDown
                    className={`shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-muted">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
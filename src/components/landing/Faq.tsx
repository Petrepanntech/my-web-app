import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Alternative Academy for beginners?",
    answer: "Absolutely! We welcome learners of all levels. Our AI-powered system will assess your current skills and create a personalized path that starts from the basics if needed.",
  },
  {
    question: "How does the freelance marketplace work?",
    answer: "Once you've acquired skills through our courses, you can browse and bid on real-world projects posted by our business partners. It's a great way to gain experience and earn money.",
  },
  {
    question: "What kind of support can I expect?",
    answer: "You'll have access to our vibrant community forum for peer support, and you can connect with expert mentors for one-on-one guidance and career advice.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "We offer a 14-day money-back guarantee on our annual subscription. If you're not satisfied within the first two weeks, you can request a full refund, no questions asked.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={faq.question}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

import React from "react";

import { CARD_CLASS } from "@/app/const";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-live-chat";
import { cn } from "@/lib/utils";
import { MessageParagraph } from "@/components/ui/message-box";

export default function RealTimeChat() {
  return (
    <>
      <div className="col-span-2 gap-2">
        <div className={cn(CARD_CLASS)}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Live Chat</AccordionTrigger>
              <AccordionContent>
                <div className="h-ful w-full p-5 rounded-md bg-white flex flex-col gap-3">
                  <MessageParagraph variant={"secondary"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </MessageParagraph>

                  <MessageParagraph left>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </MessageParagraph>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}

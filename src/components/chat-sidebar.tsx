import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Sidebar } from 'lucide-react';
import { useChat } from '@/store/useChat';

export interface SidebarProps {
  children?: React.ReactNode;
}

export function ChatSidebar({ children }: SidebarProps) {
  const toggleSidebar = useChat((state) => state.toggleSidebar);
  return (
    <Sheet modal={false} onOpenChange={toggleSidebar}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0 px-2">
          <Sidebar className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="pt-20"
        side="left"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownCapture={(e) => e.preventDefault()}
      >
        <SheetHeader className="mb-4">
          <SheetTitle>Chat History</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}

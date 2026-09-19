import { DetailedEvent, EDITORIAL_EVENTS } from "@/data/festData";

type EventListener = () => void;

class EventStore {
  private selectedEvent: DetailedEvent | null = null;
  private searchOpen = false;
  private listeners: Set<EventListener> = new Set();

  public getSelectedEvent(): DetailedEvent | null {
    return this.selectedEvent;
  }

  public setSelectedEvent(event: DetailedEvent | null) {
    this.selectedEvent = event;
    this.notify();
  }

  public selectEventById(id: string | null) {
    if (!id) {
      this.selectedEvent = null;
    } else {
      this.selectedEvent = EDITORIAL_EVENTS.find((e) => e.id === id) || null;
    }
    this.notify();
  }

  public isSearchOpen(): boolean {
    return this.searchOpen;
  }

  public setSearchOpen(open: boolean) {
    this.searchOpen = open;
    this.notify();
  }

  public subscribe(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

export const eventStore = new EventStore();

import { events } from "../data/events_data";

export function getEvent() {
  const eventList = events;
  return eventList;
}

export function filterEvent(eventLabel) {
  let filtredEvent = getEvent().filter(type => type.label === eventLabel);
  return filtredEvent;
}

# Signals vs. Observables

## The Observer Pattern

Observer is a **behavioral design pattern** that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing. The patten is also called *Publish-Subscribe*.

## Observables

The observable can be a class, an object or a function that stores its subscribers and contains a `subscribe` and an `update` method. It represents a stream of asynchronous data or events over time. It is stateless by nature, though it can manage state internally.
 It is considered stateless by nature because it does not inherently maintain a persistent or centralized value that is accessible or stored independently of its subscribers. Instead, the state (if any) is typically maintained externally or within the subscription logic of the observable. A new subscriber will not have access to a past value but will receive the value with the next event. Each subscription to an observable is independent of the others. The observable may produce a completely new set of values for each subscriber because it does not keep a persistent state shared among subscribers.
  Observables use a **push-based** model, meaning that data producers push values to subscribers as they are generated. This is different from a pull-based model, where a consumer pulls the latest state (as with signals or other stateful constructs).

## Signals (Subjects)

Signals, in contrast, are inherently stateful. They always store their current value, and their primary function is to manage and provide access to that state while reacting to changes. Like observables they also have subscribers but additionally expose a `get` and `set` method. If a new value is set the change is synchronizes automatically.

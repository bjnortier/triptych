# flow

A lightweight frontend MVC thing. Regards DOM as just another type of view, since views can be WebGL, Canvas, DOM, etc. 

Uses jQuery for DOM manipulation.

Principles:
- Complexity is the enemy should not be hidden. Care should be taken to expose dependencies as openly as possible, avoiding implicit dependencies via global lookups like singletons.
- Things should not happen automagically. Yes this can lead to more boilerplate, but automagical solutions leads to unexpected side-effects. Maintainability is more important than "rapid development".

- ES6
- Principle of least astonishment
- View-agnostic, i.e. no angular-style DOM parsing
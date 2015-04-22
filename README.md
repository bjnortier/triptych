# bicycle

A lightweight frontend MVC thing. Regards DOM as just another type of view, since views can be WebGL, Canvas, DOM, etc. 

Uses jQuery for DOM manipulation.

Principles:
- Complexity is the enemy should not be hidden. Dependencies should be stated explicitly and not be looked up via magic objects like singletons.
- Things should not happen automagically. Yes this can lead to more boilerplate, but automagical solutions leads to unexpected side-effects. Maintainability is more important than "rapid development".
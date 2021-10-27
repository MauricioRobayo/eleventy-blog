---
title: Effortless refactor with De Morgan's Laws
date: 2020-07-04
tags:
  - refactoring
layout: layouts/post.njk
---

I recently learned about [De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws) by watching an informative video by the [ProgramArtist](https://www.youtube.com/channel/UCgs-54tlVBF80MMD9_YqBng) about code refactoring.

In the video he quickly mentions De Morgan's laws to simplify a section of the code.

De Morgan's laws are a pair of transformation rules used in Boolean logic. They state that we can reverse everything inside the parenthesis so we can remove the negation:

```
!(A && B) === !A || !B
!(A || B) === !A && !B
```

In programming, reading a conditional that is wrap inside a negation adds another level of complexity, as we must understand the logic expression and then negate it.

In the video, he is using a real piece of code that looks like this:

```js
if (
  !exports.sqlTimingLogger.isErrorEnabled() &&
  (!exports.DriverSpy.dumpSqlFilteringOn || shouldSqlBeLogged(sql))
) {
  return;
}
```

Ouch! Understanding that condition requires a lot of mental effort.

Let's make it more general so it is easier to follow the process:

```js
if (!(conditionA && (!conditionB || conditionC))) {
  return;
}
```

So, how can we simplify this by applying De Morgan's laws?

First, we can remove the negation by reversing what's inside the parenthesis:

```js
if (!conditionA || !(!conditionB || conditionC)) {
  return;
}
```

Now the outer negation is gone, but we have another inner negation to which we can also apply De Morgan's law:

```js
if (!conditionA || (conditionB && !conditionC))) {
  return
}
```

This becomes easier to understand as we don't have to negate some inner logic. If we followed De Morgan's laws, we can be confident that our logic is the same, and we don't have to put our brains at work to decipher what's going on.

What's more, now that we have removed any wrapping negations effortlessly but applying De Morgan's law, we can simplify this into separate if statements which will make this a breeze to understand:

```js
if (!conditionA) {
  return;
}

if (conditionB && !conditionC) {
  return;
}
```

Let's compare that with the initial code:

```js
if (!(conditionA && (!conditionB || conditionC))) {
  return;
}
```

Thanks to De Morgan's laws, we didn't even have to understand the initial logic to refactor it and make it cleaner.

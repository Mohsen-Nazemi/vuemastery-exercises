There’s been some confusion over the new Vue 3 composition API. By the end of this lesson it should be clear why the limitations of Vue 2 have led to its creation, and how it solves a few problems for us.

There are currently three limitations you may have run into when working with Vue 2:

-   As your components get larger readability gets difficult.
-   The current code reuse patterns all come with drawbacks.
-   Vue 2 has limited TypeScript support out of the box.

I will go into detail with the first two, so it’s apparent what problem the new API solves.

## Large components can be hard to read & maintain.

To wrap our head around this problem lets think about a component that takes care of searching the products on our website.

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466230395_01-search-1.gif?alt=media&token=82d001ec-471e-4b3e-b57f-8599d15e52fd)

The code for this component, using the standard Vue component syntax, is going to look like this:

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466236547_02-old%20syntax.jpg?alt=media&token=a606626c-79ce-4426-8c45-8d27f1b1f7a0)

What happens when we also want to add the ability to sort the search results to this component. Our code then looks like:

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466246070_03-withsorting-1.jpg?alt=media&token=f41a096f-39cb-4af5-b985-cbd854b04183)

Not too bad, until we want to add search filters and pagination features to the same component. Our new features will have code fragments that we’d be splitting amongst all of our component options (components, props, data, computed, methods, and lifecycle methods). If we visualize this using colors (below) you can see how our feature code will get split up, making our component much more difficult to read and parse which code goes with which feature.

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466251996_04-logical-concerns.jpg?alt=media&token=da79b1b0-c956-4dae-aaa8-d22e67ec1714)

As you can imagine (with the image on the right), if we can keep our feature code together, our code is going to be more readable, and thus more maintainable. If we go back to our original example and group things together using the composition API, here’s what it’d look like:

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466257130_05-composition-setup.jpg?alt=media&token=3d7bccbf-7c5a-49aa-b885-bb974f71557e)

To do this with the setup() method (as shown above), we need to use the new Vue 3 composition API. The code inside setup() is a new syntax that I’ll be teaching in later lessons. It’s worth noting that this new syntax is entirely optional, and the standard way of writing Vue components is still completely valid.

I know when I first saw this, I wondered, “Wait, does this mean I create a gigantic setup method, and put all my code in there? How can that be how this works?”

No, don’t worry, this isn’t what happens. When you organize components by features using the composition API, you’ll be grouping features into composition functions that get called from your setup method, like so:

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466262485_06-composition-functions.jpg?alt=media&token=b2daaec2-3c38-4d89-b259-16f50d0ebeb8)

Using this our components can now be organized by logical concerns (also known as “features”). However, this doesn’t mean that our user interface will be made up of fewer components. You’re still going to use good component design patterns to organize your applications:

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466269664_07-comp-ui-not.jpg?alt=media&token=056ff2e2-8286-4169-9799-5d1436057cc7)

Now that you’ve seen how the Component API allows you to make large components more readable and maintainable, we can move on to the second limitation of Vue 2.

## There’s no perfect way to reuse logic between components.

When it comes to reusing code across components there are 3 good solutions to do this in Vue 2, but each has its limitations. Let’s walk through each with our example. First, there are Mixins.

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466274710_08-mixins.jpg?alt=media&token=c3d5e797-d740-45b5-b16b-d4cd7deb854f)

**The good**

-   Mixins can be organized by feature.

**The not so good**

-   They are **conflict-prone**, and you can end up with property name conflicts.
-   **Unclear relationships** on how mixins interact, if they do.
-   **Not easily reusable** if I want to configure the Mixin to use across other components.

This last item leads us to take a look at **Mixin Factories**, which are functions that return a customized version of a Mixin.

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466281614_09-Mixin%20Factory.jpg?alt=media&token=230ffcb9-6f25-4979-9a5d-fff9dc56b177)

As you can see above, Mixin Factories allow us to customize the Mixins by sending in a configuration. Now we can configure this code to use across multiple components.

**The good**

-   **Easily reusable** now that we can configure the code.
-   We have **more explicit relationships** of how our Mixins interact.

**The not so good**

-   Namespacing requires strong conventions and discipline.
-   We still have implicit property additions, meaning we have to look inside the Mixin to figure out what properties it exposes.
-   There’s no instance access at runtime, so Mixin factories can’t be dynamically generated.

Luckily, there’s one more solution that can often be the most useful, **Scoped Slots**:

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466291762_10-scoped-slots.jpg?alt=media&token=46cf56b7-2034-4a43-beb0-697322446f3b)

**The good**

-   Addresses just about every downside of Mixins.

**The not so good**

-   Your configuration ends up in your template, which ideally should only contain what we want to render.
-   They increases indentation in your template, which can decrease readability.
-   Exposed properties are only available in the template.
-   Since we’re using 3 components instead of 1, it’s a bit less performant.

So as you can see, each solution has limitations. Vue 3’s composition API provides us a 4th way to extract reusable code, which might look something like this:

![](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466297345_11-composition-api-1.jpg?alt=media&token=9f911d62-e1b7-400c-b0da-3f6f30655f71)

Now we’re creating components using the composition API inside functions that get imported and used in our setup method, where we have any configuration needed.

**The good**

-   We’re writing less code, so it’s easier to pull a feature from your component into a function.
-   It builds on your existing skills since you’re already familiar with functions.
-   It’s more flexible than Mixins and Scoped Slots since they’re just functions.
-   Intellisense, autocomplete, and typings already work in your code editor.

**The not so good**

-   Requires learning a new low-level API to define composition functions.
-   There are now two ways to write components instead of just the standard syntax.

Hopefully, the “why” behind the composition API is now clear to you, I know it wasn’t clear to me at first. In the next lesson I’ll be diving into the new syntax for composing components.
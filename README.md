## Linked Lists

### Problem solver 
Linked lists solve some of the problems we ran into when talking about arrays.  Remember that with arrays, having a contiguous list of elements, and each element stored at a specific place in memory made retrieval very predictable.  But this same attribute caused us problems when we wanted to remove or add elements near the beginning of the array.  For example, if we want to remove the second element in the array, then to we need to move the memory address of every following element in our array.  That gets costly.  With a linked list we no longer run into this problem.

  * Linked Lists are a data structure that not only store the data associated with each element but also store a pointer to another address in memory where another element exists.  We call these elements 'nodes'.  
  * Linked lists are composed of nodes containing their value, and a pointer to the next value.
  * Because each node points to a following node, each node can be anywhere in memory, so long as the previous node knows the address.


![](https://s3-us-west-2.amazonaws.com/curriculum-content/web-development/algorithms/passing-buck.jpg)
> Hierarchy at an organization can be represented as a linked list, where each individual has one subordinate that he can point to.

Let's show a visual representation of a node.

```text
    First Node
    _____
    | 'a'  | 987 |
    100-----
```

The representation of our First Node above displays the following information: it lives at address 100, it has a value of 'a', and the next node lives at memory address 987.  If we add in second and third nodes, our linked list may look like the following:

```text

First Node
    _____
    | 'a'  | 987 |
    100-----

    _____
    | 12  | 765 |
    987-----

    _____
    | 'dog'  | nil |
    765-----
```

So we can store our linked list by having a pointer to our first node, and because that first node tells us where to find the second node, and the second tells us where to find the third, and so on, we can therefore find all of the other nodes in a linked list.  



We call that first node our head.  And now we can write:

```javascript
let linkedList = firstNode

```

and by only having a pointer to our first node, we can find every other element in the list.

### Representing our linked list in Javascript

Javascript does not have a built in library that allows us to represent a linked list.  Instead, we'll have to make due with what we have.  Let's represent each node in our linked list as an array.   The first element in the node is the value, the second element is the next element's address.  

```javascript
  let firstNode = ['a', 123]
  let secondNode = ['b', 132]
  let thirdNode = ['c', null]

  let collection = {0: firstNode, 123: secondNode, 132: thirdNode}
  let head = firstNode;
```

You may think of other ways to represent the linked list.  There are others, and confident programmers, may even say better ways.  But this will do.

> Note that we are storing the elements in a JavaScript object, because for right now, we can think of retrieval of an element from a javascript object as occurring in constant time, as retrieval from an address in memory also occurs in constant time.  
We just need to hold the elements in a collection.  We'll see why in a moment.  

Ok, given the above representation.  Let's write our own `next` function.  The `next` function should return the next node in a linked list.  It will have the following function signature `next(node)` and will return the next node.  

![](https://s3-us-west-2.amazonaws.com/curriculum-content/web-development/algorithms/FerrisMuseum.jpg)
  
So now we need a function that can take in a node as an argument and return the next node.  

```javascript
let firstNode = ['cameron', 123]
let secondNode = ['sloane', 132]
let thirdNode = ['ferris', null]

let collection = {0: firstNode, 123: secondNode, 132: thirdNode}
let head = collection[0];

function next(node){
  let nextAddress = node[1] 
  // retrieve the address of the next element
  return collection[nextAddress]
}

next(firstNode)
// ['sloane', 123]
next(thirdNode)
// undefined

```

So you can see from the above code that given a node, we first find what the given node points to next, and then find the following node at the stated address.

Now try writing a function called `indexAt` that looks like the following `indexAt(head, index)` and then returns the node at that index.  We can assume a linked list is zero indexed such that `indexAt(head, 0)` will return `head`.  Ok, go for it.

```javascript
// this is your thinking space.


  ....   ....
        .
    /     \   

    ........

// your thinking space has a mustache and no chin.
```
Ok, so essentially, we need to begin at the head and call `next` a number of times equal to our index argument.  

```javascript
let firstNode = ['cameron', 123]
let secondNode = ['sloane', 132]
let thirdNode = ['ferris', null]

let collection = {0: firstNode, 123: secondNode, 132: thirdNode}
let head = collection[0];

function next(node){
  let nextAddress = node[1] 
  // retrieve the address of the next element
  return collection[nextAddress]
}

function indexAt(head, index){
  let node = head;
  for(i = 0; i < index; i++){
     node = next(node);
  }

  return node;
}

indexAt(head, 2)

// ['ferris', null]

```
### Removing Nodes in a Linked List

What we saw from the previous sections, is that while arrays could quickly retrieve elements, arrays were more costly at removing or adding elements at the beginning of a list.  To do so meant moving every subsequent element to a new slot in memory.  

Let's see how adding or removing occurs with a linked list.  Let's go back to our diagram, and remember that when referencing our linked list, we only have a pointer to our first node, which we called the head.

```text

Head
    _____
    | 'a'  | 987 |
    100-----

    _____
    | 12  | 765 |
    987-----

    _____
    | 'dog'  | nil |
    765-----
```

Now let's say we want to insert a node with a value of 456 after the second element in the list.  What should we do?  

Well we need our second element to have a pointer to our new node, and we need our new node to point to the last node.  To make these changes to our linked list, we need call our `next` function twice so that we reach the second node.  Once there, we can retrieve what the second node points to, change it to be what our new node points to, and have the second node point to our new node. 

```text

Head
    _____
    | 'a'  | 987 |
    100-----

    _____
    | 12  | 400 |  - change node to point to new node
    987-----       
    
    _____
    | 456 | 765 |  <- new node
    400-----       - change new node to point to last node

    _____
    | 'dog'  | nil |
    765-----
```

We'll let you code this procedure in the next exercise.  The important thing for now is to notice that the cost of this was relatively cheap.  The only thing that can get costly is the number of times we need to call `next` to access the index we are adding our node to.  So the cost of adding or removing elements is big O of the index we are adding to.  When adding elements towards the beginning of the linked list this will be significantly less than adding elements to the beginning of a linked list, which is big O of n.

### Removing Elements

Let's see how removing a node occurs with a linked list.  Assume we would like to remove the second node from our linked list.  Our updated linked list looks like the following.  How would we remove the third node?

```text

Head                   
    _____
    | 'a'  | 987 |    
    100-----

    _____
    | 12  | 400 |       <- When reach second node, store node
    987-----       
    
    _____
    | 456 | 765 |       <- then from third node, see that address of 
    400-----               fourth node is 765
                           Now we have necessary information to 								point the second node to point to 765

    _____
    | 'dog'  | nil |
    765-----
```

We need the second node now to point to the fourth node.  So we first need to find out the address of the fourth node, and then change the second node to point to it.  Once we change what the second node points to, nothing will point to the third node, and that third node will effectively be lost.  

> Note: Some languages like Ruby have a garbage collector to remove data from memory that is impossible to retrieve.  

We retrieve the address of the fourth node by calling `next` one time, which brings us to the second node.  We need to store the second node, and call `next` to get to the third node.  From the third node, we can retrieve the address of the fourth.  Now our task is to take the second node and have it stop pointing to the third node and instead point to the fourth node. 

```text

Head                   
    _____
    | 'a'  | 987 |    
    100-----

    _____
    | 12  | 765 | 
    987-----       
    
    _____
    | 'dog'  | nil |
    765-----
    
     _____
    | 456 | 765 |       <- Notice that nothing points to this node.
    400-----               

```

If you consider the time complexity of removing an element from a linked list, once again the cost is not dependent on the number of nodes in the linked list but instead on the index of the node that we are removing.  So we can conclude that it is cheaper to add and remove elements to a beginning of a linked list than it is for an array to add and remove elements.  We can also conclude that it is cheaper to add and remove elements elements from the beginning of a linked list than it is to remove from the end.  To solve the latter problem, sometimes one has a pointer to the end of a linked list, called a tail.  Such a data structure is called a doubly linked list.

### Summary

Linked lists help us solve some of the time complexity issues  encountered when manipulating arrays.  Unlike arrays, linked lists do not depend on an element at a given index being at a specific location in memory.  Because of this, when elements are added or removed, the location of every other element need not change.  Instead with a linked list, we only change what the node in question and adjacent nodes point to, leading to less costly data structure for frequently changing data.

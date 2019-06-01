let firstNode = ['cameron', 123]
let secondNode = ['sloane', 132]
let thirdNode = ['ferris', null]

let collection = {0:firstNode, 123: secondNode, 132: thirdNode}

let head = collection[0]

function next(node){
  let nextAddress = node[1]
  return collection[nextAddress]
}

// finds value at given index
// does this by accepting the head node, then will call the next(node) function as many times until you reach the argument index.
function indexAt(head, index){
    let node = head
    for(i=0; i<index; i++){
      node = next(node)
    }

    return node
}

//want to insert node at specific index
//example insert node val:456 after 2nd element, so at index 2
// needs pointer to next
//second element to have a pointer to our new node, and we need our new node to point to the last node.

// To make these changes to our linked list, we need call our next function twice so that we reach the second node.
// use a for loop

 //Once there, we can retrieve what the second node points to, change it to be what our new node points to, and have the second node point to our new node.

//Removing Nodes
//We retrieve the address of the fourth node by calling next one time, which brings us to the second node. We need to store the second node, and call next to get to the third node. From the third node, we can retrieve the address of the fourth. Now our task is to take the second node and have it stop pointing to the third node and instead point to the fourth node.

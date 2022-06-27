var array_of_nodes = [];
const number_of_nodes = 20;
const canvas_width = 700;
const canvas_height = 700;

const node_color = "#cb0032";
const link_color = "#cb0032";
const stroke_color = "#cb0032";
const link_width = 2;

function setup() {
  createCanvas(canvas_width, canvas_height);
  

  for (let i = 0; i <= number_of_nodes; i++) {
    node = new Node(
      floor(random(5, 10)), 
      random(0, canvas_width), 
      random(0, canvas_height), 
      node_color,
      stroke_color,
      link_color,
      link_width,
      width,
      height);
    array_of_nodes.push(node);
  }

}

function draw() {
  createCanvas(canvas_width, canvas_height);
  background(150);
  
  for (let node of array_of_nodes) {
    node.change_alpha();
    node.show_links(array_of_nodes);
  }

  for (let node of array_of_nodes) {
    node.show();

  }

  for (let node of array_of_nodes) {
    node.move(array_of_nodes);
    //Hello
  }
}

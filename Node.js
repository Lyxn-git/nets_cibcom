function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}



class Node {
  constructor(r, x, y, node_color, stroke_color, link_color, link_width, canvas_width , canvas_height) {
    
    //Position related
    this.x = x;
    this.y = y;
    this.r = r;
    this.pos = createVector(this.x, this.y);

    this.node_alpha = 255;
    this.link_alpha = 255;

    // Colors and alphas
    this.node_color = color(node_color);
    this.stroke_color = color(stroke_color);
    this.link_color = color(link_color);
    this.link_width = link_width;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    // Movement Related
    this.a = createVector(0,0);
    this.v = createVector(random(-1, 1), random(-1, 1));
  }

  change_alpha() {
    //this.alpha = 255-dist(this.x, this.y, mouseX, mouseY);
  }

  dist(other) {
    let d_x = other.x - this.x;
    let d_y = other.y - this.y;

    return Math.hypot(d_x, d_y);
  }

  get_links(array_of_nodes) {
    let neighbors = [];
    let max_distance = 3 * Math.pow(this.r, 2);
    //fill(100, 100, 100, 10);
    //circle(this.x, this.y, max_distance*2);
    for (let i of array_of_nodes) {
      if (this.dist(i) <= max_distance && this.dist(i) > 0) {
        neighbors.push(i);
      }
    }

    return neighbors;
  }

  show() {
    fill(this.node_color);
    strokeWeight(0);
    circle(this.x, this.y, this.r * 2);
  }

  show_links(array_of_nodes) {
    let color = this.link_color;
    strokeWeight(this.link_width);

    var linked_nodes = this.get_links(array_of_nodes);

    for (let node of linked_nodes) {
      push();
      color.setAlpha(255 - 0.005* Math.pow(this.dist(node), 2))
      stroke(color);
      line(this.x, this.y, node.x, node.y);
      pop();
    }
    pop();
  }
  
  bounce() {
    if (this.x >= this.canvas_width || this.x <= 0)
      this.v.x *= -1;
    if (this.y >= this.canvas_height || this.y <= 0)
      this.v.y *= -1;
  }


  move(array_of_nodes) {
    let neighbors = this.get_links(array_of_nodes);
    this.bounce();

    if (neighbors.length > 0) {
      this.cohesion(neighbors);
      this.repulsion(neighbors);
      //this.aligning(neighbors);
    }

    this.drag()

    this.x += this.v.x;
    this.y += this.v.y;
    this.pos.x = this.x;
    this.pos.y = this.y;
    
    //drawArrow(this.pos, p5.Vector.mult(this.v, 100), "blue");
  }

  cohesion(neighbors){
    let average_pos = createVector(0,0);
    for (let neighbor of neighbors){
      average_pos.add(neighbor.pos);
    }
    average_pos.div(neighbors.length);
    //circle(average_pos.x, average_pos.y, 10)
    this.v.lerp(average_pos.sub(this.pos), 0.0001)
    fill(0,255,0)
    
  }

  repulsion(neighbors){
    let leeway = Math.pow(this.r, 2);
    for (let neighbor of neighbors) {
      if (this.dist(neighbor) < this.r + neighbor.r + leeway)
        this.v.lerp(p5.Vector.sub(this.pos, neighbor.pos), 0.0005);
    }
  }

  drag() {
    let drag_coef = 0.01;
    this.v.setMag(this.v.setMag - drag_coef * this.v.mag * this.v.mag);
  }
}
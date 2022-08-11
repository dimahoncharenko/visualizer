export type SimpleGraphScheme<T = any> = {
  [K1: string]: SimpleVertice<T>;
};

class SimpleEdge {
  constructor(public vertexKey: string, public weight = 0) {}

  changeWeight(value: number) {
    this.weight = value;
  }
}

export class SimpleVertice<T = any> {
  public neigbours: SimpleEdge[] = [];

  constructor(public key: string, public value: T) {}

  addEdge(edge: SimpleEdge) {
    this.neigbours.push(edge);
  }

  removeEdge(key: string) {
    const prospect = this.neigbours.findIndex(
      (neighbour) => neighbour.vertexKey === key
    );

    if (prospect > 0) {
      this.neigbours.splice(prospect, 1);
    }
  }

  clearNeigbours() {
    this.neigbours = [];
  }
}

class SimpleGraph {
  public graph: SimpleGraphScheme = {};

  addVertex(vertex: SimpleVertice) {
    this.graph[vertex.key] = vertex;
  }

  removeVertex(key: string) {
    if (this.graph[key]) {
      if (this.graph[key].neigbours.length) {
        this.graph[key].clearNeigbours();
      }

      delete this.graph[key];
    }
  }
}

export class SimpleUndirectedGraph extends SimpleGraph {
  addEdge(vertex1: string, vertex2: string, weight = 0) {
    if (this.graph[vertex1] && this.graph[vertex2]) {
      this.graph[vertex1].addEdge(new SimpleEdge(vertex2, weight));
      this.graph[vertex2].addEdge(new SimpleEdge(vertex1, weight));
    }
  }
}

type Dist = {
  [K: string]: number;
};

type PrevVertices = {
  [K: string]: SimpleVertice | null;
};

export const breadthTraverse = (
  graph: SimpleGraphScheme,
  startingKey: string,
  endKey?: string
) => {
  const queue: string[] = [];
  queue.push(startingKey);

  while (queue.length) {
    const nodeKey = queue.shift()!;

    if (graph[nodeKey].value.visited) continue;
    if (graph[nodeKey].value.wall) continue;
    if (graph[nodeKey].key === endKey) break;
    graph[nodeKey].value.visited = true;

    for (const { vertexKey } of graph[nodeKey].neigbours) {
      queue.push(vertexKey);
    }
  }

  return graph;
};

export const depthTraverse = (
  graph: SimpleGraphScheme,
  key: string,
  endKey: string
): SimpleGraphScheme => {
  if (!graph[key] || graph[key].value.visited || graph[key].value.wall)
    return graph;

  graph[key].value.visited = true;

  for (const { vertexKey } of graph[key].neigbours) {
    if (depthTraverse(graph, vertexKey, endKey)[endKey].value.visited) {
      return graph;
    }
  }

  return graph;
};

const getClosest = (graph: SimpleGraphScheme, dist: Dist) => {
  let minDist = Infinity;
  let closestNode = "";

  for (const key in graph) {
    if (minDist > dist[key]) {
      minDist = dist[key];
      closestNode = key;
    }
  }

  return closestNode;
};

export const dijkstraSearchValue = (
  graph: SimpleGraphScheme,
  startKey: string
) => {
  const copy: SimpleGraphScheme = Object.assign({}, graph);
  const dist: Dist = {};
  const previousVertices: PrevVertices = {};
  const visited: string[] = [];

  for (const key in graph) {
    dist[key] = Infinity;
    previousVertices[key] = null;
  }

  dist[startKey] = 0;

  while (Object.keys(copy).length) {
    const closestKey = getClosest(copy, dist);

    if (!closestKey || visited.includes(closestKey)) break;

    delete copy[closestKey];

    visited.push(closestKey);
    if (graph[closestKey].value.wall) continue;

    for (const neigbour of graph[closestKey].neigbours) {
      const alt = dist[closestKey] + neigbour.weight;

      if (dist[neigbour.vertexKey] > alt) {
        dist[neigbour.vertexKey] = alt;

        previousVertices[neigbour.vertexKey] = graph[closestKey];
      }
    }
  }

  return { dist, previousVertices };
};

export const getPath = (
  map: PrevVertices,
  dest: SimpleVertice,
  res: SimpleVertice[] = []
): SimpleVertice[] => {
  const current = map[dest.key];

  if (!current) return res;

  res.push(current);

  return getPath(map, current, res);
};

export class Cell {
  public wall = false;
  public visited = false;
  constructor(public x: number, public y: number) {}
}

export const generateGrid = (width: number, height: number) => {
  const grid = new SimpleUndirectedGraph();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const vertex = new SimpleVertice(`${col}_${row}`, new Cell(col, row));
      grid.addVertex(vertex);

      grid.addEdge(vertex.key, `${col}_${row - 1}`, 1);
      grid.addEdge(vertex.key, `${col - 1}_${row}`, 1);
    }
  }

  return grid;
};

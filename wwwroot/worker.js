const randInt = (max) => Math.floor(Math.random() * max);
const init = (length) => [...new Array(length)].map((e) => Math.random());
const initPopulation = (length, width) => [...new Array(length)].map((e) => init(width));
const fitness = (individual) => individual.reduceRight((result, e) => (result += e), 0);
const mutation = (individual, probability) => individual.map((e) => (Math.random() < probability ? Math.random() : e));
const cross = (parent1, parent2, crossPoint) => [...parent1.slice(0, crossPoint), ...parent2.slice(crossPoint, parent2.length)];
const nextGeneration = (population) => population.map((e) => createChild(e, population[randInt(population.length)], randInt(e.length)));

const createChild = (parent1, parent2, crossPoint) => {
  let child = cross(parent1, parent2, crossPoint);
  const mutant = mutation(child, 0.2);

  if (fitness(parent1) < fitness(child)) child = parent1;
  return fitness(child) < fitness(mutant) ? child : mutant;
};

addEventListener("message", () => {
  let population = initPopulation(5000, 40);
  let bestFitnessYet = 5000;

  for (let generation = 0; generation < 1000; generation++) {
    population = nextGeneration(population);
    population.sort(function (a, b) {
      return fitness(a) - fitness(b);
    });

    if (fitness(population[0]).toFixed(2) < bestFitnessYet) {
      bestFitnessYet = fitness(population[0]).toFixed(2);
      postMessage(population[0]);
    }
  }
});

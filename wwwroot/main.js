const fitness = (individual) =>
  individual.reduceRight((result, e) => (result += e), 0);

const print = (individ) => {
  document.writeln(
    "<p style='margin: 0px; font-size: 0.6em; font-family: monospace'>"
  );
  document.writeln("<b>New result: </b>");

  for (var i = 0; i < individ.length; i++)
    document.writeln(individ[i].toFixed(2));

  document.writeln(" <b>" + fitness(individ).toFixed(2) + "</b>");
  document.writeln(
    '<meter min="0" max="2" style="width: 100px; appearance: none;" value="' +
      fitness(individ).toFixed(2) +
      '" />'
  );
  document.writeln("</p>");
};

const printPopulation = (population) => population.map((e) => print(e));

const worker = new Worker("worker.js");

worker.onmessage = function (evt) {
  print(evt.data);
};
worker.postMessage("");

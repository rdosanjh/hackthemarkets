function type(d) {
  d.date = formatDate.parse(d.date);
  d.close = +d.close;
  return d;
}




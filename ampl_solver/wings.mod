set wings;

param cost{wings};
param target;
var order{wings} integer, >= 0;

minimize total_cost:
	sum{w in wings} order[w]*cost[w];
	
subject to satisfies_demand:
	sum{w in wings} order[w]*w >= target;
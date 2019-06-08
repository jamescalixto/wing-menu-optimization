import sys
import os
import pandas as pd
from amplpy import AMPL, Environment


# Holds dataframe of output.
output = None

try:
    # Binary path to AMPL install location.
    ampl = AMPL(environment=Environment(binaryDirectory=r'C:\Program Files\AMPL'))

    # Integer programming solver.
    ampl.setOption('solver', 'gurobi')

    # Read in AMPL files.
    ampl.read('wings.mod')
    ampl.readData('wings.dat')

    # Insert cost as column.
    output = ampl.param['cost'].getValues().toPandas()
    output.index = pd.to_numeric(output.index, downcast='integer')
    output.index.name = 'wings'

    # Solve for multiple target values. Can't solve for less than 4 wings.
    MAX_TARGET_TO_SOLVE = 400
    for target in range(4, MAX_TARGET_TO_SOLVE + 1):
        # Show progress.
        print('Processing target of {}...'.format(target))

        # Set target number of wings.
        ampl.param['target'] = target
        ampl.solve()

        # Convert to dataframe and merge.
        df = ampl.var['order'].getValues().toPandas().astype(int)
        df.index = pd.to_numeric(df.index, downcast='integer')
        df.rename(columns = {'order.val': target}, inplace=True)
        output = pd.concat([output, df], axis=1)

except Exception as e:
    print(e)
    raise

# Display and save output.
print(output)
output.to_csv('optimal_wings.csv')
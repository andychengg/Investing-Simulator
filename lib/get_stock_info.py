import sys
import json
from yahooquery import Ticker

symbols = sys.argv[1:]

ticker = Ticker(symbols)

print(json.dumps(ticker.summary_detail))

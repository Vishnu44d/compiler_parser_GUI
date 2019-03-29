from parsing_table import *

def closure(G, I):
    J = I
    nonterminals = []
    while True:
        item_len = len(J) + sum(len(v) for v in J.itervalues())
        for heads in J.keys():
            for prods in J[heads]:
                dot_pos = prods.index('.')
                if dot_pos + 1 < len(prods):
                    prod_after_dot = prods[dot_pos + 1]
                    if prod_after_dot in nonterminals:
                        for prod in G[prod_after_dot]:
                            if prod == ['^']:
                                item = ["."]
                            else:
                                item = ["."] + prod
                            if prod_after_dot not in J.keys():
                                J[prod_after_dot] = [item]
                            elif item not in J[prod_after_dot]:
                                J[prod_after_dot].append(item)
        if item_len == len(J) + sum(len(v) for v in J.itervalues()):
            return J
from parsing_table import driver, print_table
gr2 = ['E->TA', 'A->+TA', 'A->', 'T->FB', 'B->*FB', 'B->', 'F->i', 'F->(E)']

_, f, _ = driver(gr2, "E")

print_table(f)

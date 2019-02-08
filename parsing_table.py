eps_symbol = 'z'


def find_ter_and_non_ter(g):
    temp = "".join(g)
    temp = temp.split("->")
    temp = "".join(temp)
    T = []
    NT = []
    for s in temp:
        if s.isalpha() and s.isupper():
            NT.append(s)
        else:

            T.append(s)
    return set(T), set(NT)


def rule(g):
    return set([tuple(i.split("->")) for i in g])


def union(first, second):
    n = len(first)
    first |= second
    return len(first) != n


def is_terminal(s):
    if s.isalpha() and s.islower():
        return True
    return False


def is_nonterminal(s):
    if s.isalpha() and s.isupper():
        return True
    return False


def first_and_follow(grammer, start):
    terminals, nonterminals = find_ter_and_non_ter(grammer)
    rules = rule(grammer)
    first = {i: set() for i in nonterminals}
    first.update((i, {i}) for i in terminals)
    follow = {i: set() for i in nonterminals}
    follow[start] = {"$"}
    epsilon = set()

    while True:
        updated = False
        for nt, exp in rules:
            for s in exp:
                updated = updated | union(first[nt], first[s])
                if s not in epsilon:
                    break
            else:
                updated = updated | union(epsilon, {nt})
            temp = follow[nt]
            for s in reversed(exp):
                if s in follow:
                    updated |= union(follow[s], temp)
                if s in epsilon:
                    temp = temp.union(first[s])
                else:
                    temp = first[s]
        if not updated:
            return first, follow, epsilon


def clean_grammer(g):
    ng = []
    for l in g:
        ng.append(l.replace(" ", ""))
    return ng


def print_table(g):
    for l in g:
        print(l, "\t", g[l])


def expand_grammer(grammer):
    res = []
    for l in grammer:
        t = l.split("|")
        res.append("")


def get_table(grammer, first, follow):
    T, NT = find_ter_and_non_ter(grammer)
    T = T | {'$'}
    table = {i: {j: "NULL" for j in T} for i in NT}
    for rule in grammer:
        try:
            s = rule[3]
        except:
            s = eps_symbol
        finally:
            if s in T or s in NT:
                # print(s, " Yes")
                for i in first[s]:
                    table[rule[0]][i] = rule
            else:
                # print(s, " Yes")
                for i in follow[rule[0]]:
                    table[rule[0]][i] = rule + eps_symbol
    return table


def driver(grammer, start):
    grammer = clean_grammer(grammer)
    first, follow, eps = first_and_follow(grammer, start)
    first_ = first
    for e in eps:
        first[e] |= {eps_symbol}
    # print("FIRST")
    # print_table(first)
    # print("")
    # print("FOLLOW")
    # print_table(follow)
    # print("")
    # print("")
    first__ = first
    first = first_
    # print("#########################")
    # print("#####Parsing Table is####")
    # print("#########################")
    tb = get_table(grammer, first, follow)
    # print_table(tb)
    return first__, follow, tb


if __name__ == "__main__":
    n = int(input("Enter the number of productions: "))
    print("Enter all the productions:")
    grammer_in = [input() for i in range(n)]
    start_in = input("Enter the start symbol: ")
    _, flw, _ = driver(grammer_in, start_in)
    print_table(flw)

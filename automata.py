dfa = {
    0: {'0': 0, '1': 1},
    1: {'0': 2, '1': 0},
    2: {'0': 1, '1': 2}
}


def dfa_match(delta, initial, final, st):
    curr_state = initial
    for symbol in st:
        curr_state = delta[curr_state][symbol]
    if curr_state in final:
        return True
    return False


nfa = {
    0: {'0': [1, 0], '1': [1]},
    1: {'0': [2], '1': [0]},
    2: {'0': [1], '1': [2]},
}


nfa2 = {
    "A": {'0': ["B", "A"], '1': ["B"]},
    "B": {'0': ["C"], '1': ["A"]},
    "C": {'0': ["B"], '1': ["C"]},
}


def draw_fa(fa, final, start, file_name="my_first"):
    g = Digraph('finite_state_machine')
    g.attr(rankdir='LR', size='8,5')
    #g.engine = 'lefty'
    g.format = 'png'
    edges_ls = []

    for n in fa:
        if n in final:
            g.attr('node', shape='doublecircle')
            g.node(str(n))
        elif n == start:
            g.attr('node', shape="Mcircle")
            g.node(str(n))
        else:
            g.attr('node', shape="ellipse")
            g.node(str(n))

    for node in fa:
        g.node(str(node), str(node))
        if len(fa[node]) == 0:
            pass
        else:
            for symbol in fa[node]:
                try:
                    for s in fa[node][symbol]:
                        edges_ls.append([str(node), str(s), str(symbol)])
                except:
                    edges_ls.append(
                        [str(node), str(fa[node][symbol]), str(symbol)])

    for e in edges_ls:
        g.edge(e[0], e[1], label=e[2])
    g.render('img/'+file_name)
    return "img/"+file_name
    # g.view()
    '''
    isSave = input("Do you want to save this[Y/N] ")
    if isSave == 'Y' or isSave == 'y':
        f_name = input("Enter the file name to save the nfa in png ")
        g.render('output/'+f_name, view=True)
        print("File saved at output/"+f_name+'.png')
    '''


def nfa_match(delta, initial, final, st):
    try:
        if st == "":
            return False
        curr_states = delta[initial][st[0]]
        for symbol in st:
            next_sates = set()
            for curr_state in curr_states:
                for next_sate in delta[curr_state][symbol]:
                    next_sates |= set(delta[next_sate][symbol])
                curr_states = next_sates
                # print(curr_states)
        for i in curr_states:
            if i in final:
                return True
        return False
    except:
        return "Check your Input"


if __name__ == "__main__":
    print(nfa_match(nfa2, "A", {"C"}, '11'))
    #print(dfa_match(dfa, 0, {0}, '101'))

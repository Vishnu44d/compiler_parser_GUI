import copy
grammar = []
new_grammar = []
terminals = []
non_terminals = []
I_n = {}
shift_list = []
reduction_list = []
action_list = []
rule_dict = {}
follow_dict = {}
SR = []
RR = []

def read_grammar():
	global grammar, terminals, non_terminals, rule_dict
	for each_grammar in grammar:
		if each_grammar[0] not in non_terminals:
			non_terminals.append(each_grammar[0])

	for each_grammar in grammar:
		for token in each_grammar.strip().replace(" ", "").replace("->", ""):
			if token not in non_terminals and token not in terminals:
				terminals.append(token)
            
	for l in range(1, len(grammar)+1):
		rule_dict[l] = grammar[l-1]
	#print(grammar)

def augmented_grammar():
	global grammar, new_grammar
	read_grammar()

	if "'" not in grammar[0]:
		grammar.insert(0, grammar[0][0]+"'"+"->"+grammar[0][0])

	new_grammar = []
	for each_grammar in grammar:
		idx = each_grammar.index(">")
		each_grammar = each_grammar[:idx+1]+"."+each_grammar[idx+1:]
		new_grammar.append(each_grammar)


def compute_I0():
	global new_grammar, non_terminals, I_n
	augmented_grammar()

	grammar2add = []
	grammar2add.append(new_grammar[0])
	i = 0
	for each in grammar2add:
		current_pos = each.index(".")
		current_variable = each[current_pos+1]
		if current_variable in non_terminals:
			for each_grammar in new_grammar:
				if each_grammar[0] == current_variable and each_grammar not in grammar2add:
					grammar2add.append(each_grammar)

		I_n[i] = grammar2add


def GOTO():
	global grammar, non_terminals, terminals, I_n, shift_list
	compute_I0()

	variables = non_terminals + terminals
	i = 0
	current_state = 0
	done = False
	
	while (not done):
		for each_variable in variables:
			grammar2add = []
			try:
				for each_rule in I_n[current_state]:
					if each_rule[-1] == ".":
								continue
					dot_idx = each_rule.index(".")

					if each_rule[dot_idx+1] == each_variable:
						
						rule = copy.deepcopy(each_rule)
						rule = rule.replace(".", "")
						rule = rule[:dot_idx+1]+"."+rule[dot_idx+1:]
						grammar2add.append(rule)

						for rule in grammar2add:
							dot_idx = rule.index(".")
							if rule[-1] == ".":
								pass
							else:
								current_variable = rule[dot_idx+1]
								
								if current_variable in non_terminals:
									for each_grammar in new_grammar:
										if each_grammar[0] == current_variable and each_grammar[1] != "'" and each_grammar not in grammar2add:
											grammar2add.append(each_grammar)


			except:
				done = True
				break

			if grammar2add:

				if grammar2add not in I_n.values():
					i += 1
					I_n[i] = grammar2add

				for k,v in I_n.items():
					if grammar2add == v:
						idx = k
				
				shift_list.append([current_state, each_variable, idx])
		current_state += 1


def follow(var):
	
	global rule_dict, follow_dict, terminals

	value = []
	if var == rule_dict[1][0]:
		value.append("$")

	for rule in rule_dict.values():
		
		lhs, rhs = rule.split("->")

		if var == rule[-1]:
			for each in follow(rule[0]):
				if each not in value:
					value.append(each)

		if var in rhs:
			idx = rhs.index(var)

			try:
				if rhs[idx+1] in non_terminals and rhs[idx+1] != var:
					for each in follow(rhs[idx+1]):
						value.append(each)
				else:
					value.append(rhs[idx+1])
			except:
				pass


	return value


def reduction():
	global I_n, rule_dict, reduction_list
	
	reduction_list.append([1, "$", "Accept"])

	for item in I_n.items():
		try:
			for each_production in item[1]:
				lhs, rhs = each_production.split(".")

				for rule in rule_dict.items():

					if lhs == rule[1]:
						f = follow(lhs[0])
						for each_var in f:
							reduction_list.append([item[0], each_var, "R"+str(rule[0])])

		except:
			pass


def create_table():
	global I_n, terminals, non_terminals, shift_list, reduction_list
	n_states = len(I_n)
	tab = {i:{} for i in range(n_states)}
	all_symbols = terminals + ['$'] + non_terminals
	for i in range(n_states):
		tab[i] = {k:'Er' for k in all_symbols}
	#print(all_symbols)
	for mlist in shift_list:
		r = mlist[0]
		c = mlist[1]
		v = mlist[2]
		tab[r][c] = v
		#print("DEBUG:: r, c, v, Tab[r][c] = ", r, c, v, tab[r][c])
	for rlist in reduction_list:
		r = rlist[0]
		c = rlist[1]
		v = rlist[2]
		#tab[r] = {k:'E' for k in all_symbols}
		tab[r][c] = v
		#print("DEBUG2:: r, c, v, Tab[r][c] = ", r, c, v, tab[r][c])
	
	#print(tab)

	return tab, terminals, non_terminals
	'''
	print("\t", "\t".join(all_symbols))
	print("-----------------------------------------------------------------------------------")
	stt = 0
	for i in tab.keys():
		st = str(stt) + "\t"
		for j in tab[i]:
			st = st + str(tab[i][j]) + "\t"
		print(st)
		stt += 1
	'''



def drive_me(inp):
	global grammar
	grammar = inp
	GOTO()
	reduction()
	tabll, ter, nt = create_table()
	return tabll, ter, nt

'''
def main():
	global I_n, shift_list, reduction_list, action_list, SR, RR, grammar
	grammar = ['E->E+T', 'E->T', 'T->T*F', 'T->F', 'F->(E)', 'F->i']
	GOTO()
	reduction()
	#print(shift_list)
	#print(reduction_list)

	#print(grammar)
	#print(new_grammar)
	create_table()		
	#action_list.extend(shift_list)
	#action_list.extend(reduction_list)
	return 0
	
'''



if __name__ == '__main__':
	#main()
	test = ['E->E+T', 'E->T', 'T->T*F', 'T->F', 'F->(E)', 'F->i']
	drive_me(test)

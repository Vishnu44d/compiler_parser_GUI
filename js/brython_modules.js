__BRYTHON__.VFS_timestamp = 1549659761944
__BRYTHON__.use_VFS = true
__BRYTHON__.VFS = {"browser.object_storage": [".py", "import json\n\nclass _UnProvided():\n pass\n \n \nclass ObjectStorage():\n\n def __init__(self,storage):\n  self.storage=storage\n  \n def __delitem__(self,key):\n  del self.storage[json.dumps(key)]\n  \n def __getitem__(self,key):\n  return json.loads(self.storage[json.dumps(key)])\n  \n def __setitem__(self,key,value):\n  self.storage[json.dumps(key)]=json.dumps(value)\n  \n def __contains__(self,key):\n  return json.dumps(key)in self.storage\n  \n def get(self,key,default=None ):\n  if json.dumps(key)in self.storage:\n   return self.storage[json.dumps(key)]\n  return default\n  \n def pop(self,key,default=_UnProvided()):\n  if type(default)is _UnProvided or json.dumps(key)in self.storage:\n   return json.loads(self.storage.pop(json.dumps(key)))\n  return default\n  \n def __iter__(self):\n  keys=self.keys()\n  return keys.__iter__()\n  \n def keys(self):\n  return [json.loads(key)for key in self.storage.keys()]\n  \n def values(self):\n  return [json.loads(val)for val in self.storage.values()]\n  \n def items(self):\n  return list(zip(self.keys(),self.values()))\n  \n def clear(self):\n  self.storage.clear()\n  \n def __len__(self):\n  return len(self.storage)\n", ["json"]], "browser": [".py", "import javascript\n\nfrom _browser import *\n\nfrom .local_storage import LocalStorage\nfrom .session_storage import SessionStorage\nfrom .object_storage import ObjectStorage\n\nWebSocket=window.WebSocket.new\n", ["_browser", "browser.local_storage", "browser.object_storage", "browser.session_storage", "javascript"], 1], "automata": [".py", "dfa = {\n    0: {'0': 0, '1': 1},\n    1: {'0': 2, '1': 0},\n    2: {'0': 1, '1': 2}\n}\n\n\ndef dfa_match(delta, initial, final, st):\n    curr_state = initial\n    for symbol in st:\n        curr_state = delta[curr_state][symbol]\n    if curr_state in final:\n        return True\n    return False\n\n\nnfa = {\n    0: {'0': [1, 0], '1': [1]},\n    1: {'0': [2], '1': [0]},\n    2: {'0': [1], '1': [2]},\n}\n\n\nnfa2 = {\n    \"A\": {'0': [\"B\", \"A\"], '1': [\"B\"]},\n    \"B\": {'0': [\"C\"], '1': [\"A\"]},\n    \"C\": {'0': [\"B\"], '1': [\"C\"]},\n}\n\n\ndef draw_fa(fa, final, start, file_name=\"my_first\"):\n    g = Digraph('finite_state_machine')\n    g.attr(rankdir='LR', size='8,5')\n    #g.engine = 'lefty'\n    g.format = 'png'\n    edges_ls = []\n\n    for n in fa:\n        if n in final:\n            g.attr('node', shape='doublecircle')\n            g.node(str(n))\n        elif n == start:\n            g.attr('node', shape=\"Mcircle\")\n            g.node(str(n))\n        else:\n            g.attr('node', shape=\"ellipse\")\n            g.node(str(n))\n\n    for node in fa:\n        g.node(str(node), str(node))\n        if len(fa[node]) == 0:\n            pass\n        else:\n            for symbol in fa[node]:\n                try:\n                    for s in fa[node][symbol]:\n                        edges_ls.append([str(node), str(s), str(symbol)])\n                except:\n                    edges_ls.append(\n                        [str(node), str(fa[node][symbol]), str(symbol)])\n\n    for e in edges_ls:\n        g.edge(e[0], e[1], label=e[2])\n    g.render('img/'+file_name)\n    return \"img/\"+file_name\n    # g.view()\n    '''\n    isSave = input(\"Do you want to save this[Y/N] \")\n    if isSave == 'Y' or isSave == 'y':\n        f_name = input(\"Enter the file name to save the nfa in png \")\n        g.render('output/'+f_name, view=True)\n        print(\"File saved at output/\"+f_name+'.png')\n    '''\n\n\ndef nfa_match(delta, initial, final, st):\n    try:\n        if st == \"\":\n            return False\n        curr_states = delta[initial][st[0]]\n        for symbol in st:\n            next_sates = set()\n            for curr_state in curr_states:\n                for next_sate in delta[curr_state][symbol]:\n                    next_sates |= set(delta[next_sate][symbol])\n                curr_states = next_sates\n                # print(curr_states)\n        for i in curr_states:\n            if i in final:\n                return True\n        return False\n    except:\n        return \"Check your Input\"\n\n\nif __name__ == \"__main__\":\n    print(nfa_match(nfa2, \"A\", {\"C\"}, '11'))\n    #print(dfa_match(dfa, 0, {0}, '101'))\n", []], "json": [".js", "var $module = (function($B){\n\nvar _b_ = $B.builtins\nfunction js2py(js){\n    switch(typeof js){\n        case \"object\":\n            if(js === null){\n                return _b_.None\n            }else if(Array.isArray(js)){\n                var res = _b_.list.$factory()\n                js.forEach(function(item){\n                    res.push(js2py(item))\n                })\n            }else{\n                var res = _b_.dict.$factory()\n                Object.keys(js).forEach(function(key){\n                    res.$string_dict[key] = js2py(js[key])\n                })\n            }\n            return res\n        default:\n            return js\n    }\n}\n\nreturn  {\n    loads : function(){\n        var $ = $B.args('loads', 1, {obj:null}, ['obj'], arguments, {},\n            null, null)\n        return js2py(JSON.parse($.obj))\n    },\n    load : function(){\n        var $ = $B.args('load', 1, {obj:null}, ['obj'], arguments, {},\n            null, null)\n        return $module.loads(obj.$content);\n    },\n    dumps : function(){\n        var $ = $B.args('dumps', 1, {obj:null}, ['obj'], arguments, {},\n            null, null)\n        return JSON.stringify($B.pyobj2jsobj($.obj))\n    }\n}\n\n})(__BRYTHON__)\n"], "sys": [".py", "\nfrom _sys import *\n\n_getframe=Getframe\nfrom javascript import JSObject\nfrom browser import window\n\nabiflags=0\n\nbrython_debug_mode=__BRYTHON__.debug\n\nbase_exec_prefix=__BRYTHON__.brython_path\n\nbase_prefix=__BRYTHON__.brython_path\n\nbuiltin_module_names=__BRYTHON__.builtin_module_names\n\nbyteorder='little'\n\nexec_prefix=__BRYTHON__.brython_path\n\nexecutable=__BRYTHON__.brython_path+'/brython.js'\n\nargv=__BRYTHON__.__ARGV\n\ndef exit(i=None ):\n raise SystemExit('')\n \nclass flag_class:\n\n def __init__(self):\n  self.debug=0\n  self.inspect=0\n  self.interactive=0\n  self.optimize=0\n  self.dont_write_bytecode=0\n  self.no_user_site=0\n  self.no_site=0\n  self.ignore_environment=0\n  self.verbose=0\n  self.bytes_warning=0\n  self.quiet=0\n  self.hash_randomization=1\n  \nflags=flag_class()\n\nclass float_info:\n mant_dig=53\n max=window.Number.MAX_VALUE\n min=window.Number.MIN_VALUE\n radix=2\n \ndef getfilesystemencoding(*args,**kw):\n ''\n\n \n return 'utf-8'\n \ndef getfilesystemencodeerrors():\n return \"utf-8\"\n \ndef getrecursionlimit():\n return 200\n \ndef intern(string):\n return string\n \nmaxsize=2 **63 -1\n\nmaxunicode=1114111\n\nplatform=\"brython\"\n\nprefix=__BRYTHON__.brython_path\n\ndef settrace(tracefunc):\n print(\"set trace\")\n \nversion='.'.join(str(x)for x in __BRYTHON__.version_info[:3])\nversion +=\" (default, %s) \\n[Javascript 1.5] on Brython\"\\\n%__BRYTHON__.compiled_date\nhexversion=0x03070000\n\nclass _version_info:\n\n def __init__(self,version_info):\n  self.version_info=version_info\n  self.major=version_info[0]\n  self.minor=version_info[1]\n  self.micro=version_info[2]\n  self.releaselevel=version_info[3]\n  self.serial=version_info[4]\n  \n def __getitem__(self,index):\n  if isinstance(self.version_info[index],list):\n   return tuple(self.version_info[index])\n  return self.version_info[index]\n  \n def hexversion(self):\n  try :\n   return '0%d0%d0%d'%(self.major,self.minor,self.micro)\n  finally :\n   return '0%d0000'%(self.major)\n   \n def __str__(self):\n  _s=\"sys.version(major=%d, minor=%d, micro=%d, releaselevel='%s', \"\\\n  \"serial=%d)\"\n  return _s %(self.major,self.minor,self.micro,\n  self.releaselevel,self.serial)\n  \n def __eq__(self,other):\n  if isinstance(other,tuple):\n   return (self.major,self.minor,self.micro)==other\n   \n  raise Error(\"Error! I don't know how to compare!\")\n  \n def __ge__(self,other):\n  if isinstance(other,tuple):\n   return (self.major,self.minor,self.micro)>=other\n   \n  raise Error(\"Error! I don't know how to compare!\")\n  \n def __gt__(self,other):\n  if isinstance(other,tuple):\n   return (self.major,self.minor,self.micro)>other\n   \n  raise Error(\"Error! I don't know how to compare!\")\n  \n def __le__(self,other):\n  if isinstance(other,tuple):\n   return (self.major,self.minor,self.micro)<=other\n   \n  raise Error(\"Error! I don't know how to compare!\")\n  \n def __lt__(self,other):\n  if isinstance(other,tuple):\n   return (self.major,self.minor,self.micro)<other\n   \n  raise Error(\"Error! I don't know how to compare!\")\n  \n def __ne__(self,other):\n  if isinstance(other,tuple):\n   return (self.major,self.minor,self.micro)!=other\n   \n  raise Error(\"Error! I don't know how to compare!\")\n  \n  \n  \nversion_info=_version_info(__BRYTHON__.version_info)\n\nclass _implementation:\n\n def __init__(self):\n  self.name='brython'\n  self.version=_version_info(__BRYTHON__.implementation)\n  self.hexversion=self.version.hexversion()\n  self.cache_tag=None\n  \n def __repr__(self):\n  return \"namespace(name='%s' version=%s hexversion='%s')\"%(self.name,\n  self.version,self.hexversion)\n  \n def __str__(self):\n  return \"namespace(name='%s' version=%s hexversion='%s')\"%(self.name,\n  self.version,self.hexversion)\n  \nimplementation=_implementation()\n\nclass _hash_info:\n\n def __init__(self):\n  self.width=32,\n  self.modulus=2147483647\n  self.inf=314159\n  self.nan=0\n  self.imag=1000003\n  self.algorithm='siphash24'\n  self.hash_bits=64\n  self.seed_bits=128\n  cutoff=0\n  \n def __repr__(self):\n \n  return \"sys.hash_info(width=32, modulus=2147483647, inf=314159, \"\\\n  \"nan=0, imag=1000003, algorithm='siphash24', hash_bits=64, \"\\\n  \"seed_bits=128, cutoff=0)\"\n  \nhash_info=_hash_info()\n\nclass _float_info:\n ''\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n \n def __init__(self):\n  _number=window.Number\n  self.dig=15\n  self.epsilon=2 **-52\n  self.mant_dig=53\n  self.max=_number.MAX_VALUE\n  self.max_exp=2 **10\n  self.max_10_exp=308\n  self.min=2 **(-1022)\n  self.min_exp=-1021\n  self.min_10_exp=-307\n  self.radix=2\n  self.rounds=1\n  self._tuple=(self.max,self.max_exp,self.max_10_exp,self.min,\n  self.min_exp,self.min_10_exp,self.dig,self.mant_dig,self.epsilon,\n  self.radix,self.rounds)\n  \n def __getitem__(self,k):\n  return self._tuple[k]\n  \n def __iter__(self):\n  return iter(self._tuple)\n  \nfloat_info=_float_info()\n\nwarnoptions=[]\n\ndef getfilesystemencoding():\n return 'utf-8'\n \n \n__stdout__=__BRYTHON__.stdout\n__stderr__=__BRYTHON__.stderr\n__stdin__=__BRYTHON__.stdin\n\n", ["_sys", "browser", "javascript"]], "parsing_table": [".py", "eps_symbol = 'z'\n\n\ndef find_ter_and_non_ter(g):\n    temp = \"\".join(g)\n    temp = temp.split(\"->\")\n    temp = \"\".join(temp)\n    T = []\n    NT = []\n    for s in temp:\n        if s.isalpha() and s.isupper():\n            NT.append(s)\n        else:\n\n            T.append(s)\n    return set(T), set(NT)\n\n\ndef rule(g):\n    return set([tuple(i.split(\"->\")) for i in g])\n\n\ndef union(first, second):\n    n = len(first)\n    first |= second\n    return len(first) != n\n\n\ndef is_terminal(s):\n    if s.isalpha() and s.islower():\n        return True\n    return False\n\n\ndef is_nonterminal(s):\n    if s.isalpha() and s.isupper():\n        return True\n    return False\n\n\ndef first_and_follow(grammer, start):\n    terminals, nonterminals = find_ter_and_non_ter(grammer)\n    rules = rule(grammer)\n    first = {i: set() for i in nonterminals}\n    first.update((i, {i}) for i in terminals)\n    follow = {i: set() for i in nonterminals}\n    follow[start] = {\"$\"}\n    epsilon = set()\n\n    while True:\n        updated = False\n        for nt, exp in rules:\n            for s in exp:\n                updated = updated | union(first[nt], first[s])\n                if s not in epsilon:\n                    break\n            else:\n                updated = updated | union(epsilon, {nt})\n            temp = follow[nt]\n            for s in reversed(exp):\n                if s in follow:\n                    updated |= union(follow[s], temp)\n                if s in epsilon:\n                    temp = temp.union(first[s])\n                else:\n                    temp = first[s]\n        if not updated:\n            return first, follow, epsilon\n\n\ndef clean_grammer(g):\n    ng = []\n    for l in g:\n        ng.append(l.replace(\" \", \"\"))\n    return ng\n\n\ndef print_table(g):\n    for l in g:\n        print(l, \"\\t\", g[l])\n\n\ndef expand_grammer(grammer):\n    res = []\n    for l in grammer:\n        t = l.split(\"|\")\n        res.append(\"\")\n\n\ndef get_table(grammer, first, follow):\n    T, NT = find_ter_and_non_ter(grammer)\n    T = T | {'$'}\n    table = {i: {j: \"NULL\" for j in T} for i in NT}\n    for rule in grammer:\n        try:\n            s = rule[3]\n        except:\n            s = eps_symbol\n        finally:\n            if s in T or s in NT:\n                # print(s, \" Yes\")\n                for i in first[s]:\n                    table[rule[0]][i] = rule\n            else:\n                # print(s, \" Yes\")\n                for i in follow[rule[0]]:\n                    table[rule[0]][i] = rule + eps_symbol\n    return table\n\n\ndef driver(grammer, start):\n    grammer = clean_grammer(grammer)\n    first, follow, eps = first_and_follow(grammer, start)\n    first_ = first\n    for e in eps:\n        first[e] |= {eps_symbol}\n    # print(\"FIRST\")\n    # print_table(first)\n    # print(\"\")\n    # print(\"FOLLOW\")\n    # print_table(follow)\n    # print(\"\")\n    # print(\"\")\n    first__ = first\n    first = first_\n    # print(\"#########################\")\n    # print(\"#####Parsing Table is####\")\n    # print(\"#########################\")\n    tb = get_table(grammer, first, follow)\n    # print_table(tb)\n    return first__, follow, tb\n\n\nif __name__ == \"__main__\":\n    n = int(input(\"Enter the number of productions: \"))\n    print(\"Enter all the productions:\")\n    grammer_in = [input() for i in range(n)]\n    start_in = input(\"Enter the start symbol: \")\n    _, flw, _ = driver(grammer_in, start_in)\n    print_table(flw)\n", []], "browser.local_storage": [".py", "\nimport sys\nfrom browser import window,console\n\nhas_local_storage=hasattr(window,'localStorage')\n\nclass _UnProvided():\n pass\n \nclass LocalStorage():\n storage_type=\"local_storage\"\n \n def __init__(self):\n  if not has_local_storage:\n   raise EnvironmentError(\"LocalStorage not available\")\n  self.store=window.localStorage\n  \n def __delitem__(self,key):\n  if (not isinstance(key,str)):\n   raise TypeError(\"key must be string\")\n  if key not in self:\n   raise KeyError(key)\n  self.store.removeItem(key)\n  \n def __getitem__(self,key):\n  if (not isinstance(key,str)):\n   raise TypeError(\"key must be string\")\n  res=self.store.getItem(key)\n  if res is not None :\n   return res\n  raise KeyError(key)\n  \n def __setitem__(self,key,value):\n  if not isinstance(key,str):\n   raise TypeError(\"key must be string\")\n  if not isinstance(value,str):\n   raise TypeError(\"value must be string\")\n  self.store.setItem(key,value)\n  \n  \n def __contains__(self,key):\n  if (not isinstance(key,str)):\n   raise TypeError(\"key must be string\")\n  res=self.store.getItem(key)\n  if res is None :\n   return False\n  return True\n  \n def __iter__(self):\n  keys=self.keys()\n  return keys.__iter__()\n  \n def get(self,key,default=None ):\n  if (not isinstance(key,str)):\n   raise TypeError(\"key must be string\")\n  return self.store.getItem(key)or default\n  \n def pop(self,key,default=_UnProvided()):\n  if (not isinstance(key,str)):\n   raise TypeError(\"key must be string\")\n  if type(default)is _UnProvided:\n   ret=self.get(key)\n   del self[key]\n   return ret\n  else :\n   if key in self:\n    ret=self.get(key)\n    del self[key]\n    return ret\n   else :\n    return default\n    \n    \n    \n def keys(self):\n  return [self.store.key(i)for i in range(self.store.length)]\n  \n def values(self):\n  return [self.__getitem__(k)for k in self.keys()]\n  \n def items(self):\n  return list(zip(self.keys(),self.values()))\n  \n def clear(self):\n  self.store.clear()\n  \n def __len__(self):\n  return self.store.length\n  \nif has_local_storage:\n storage=LocalStorage()\n", ["browser", "sys"]], "browser.session_storage": [".py", "\nimport sys\nfrom browser import window\nfrom .local_storage import LocalStorage\n\nhas_session_storage=hasattr(window,'sessionStorage')\n\nclass SessionStorage(LocalStorage):\n\n storage_type=\"session_storage\"\n \n def __init__(self):\n  if not has_session_storage:\n   raise EnvironmentError(\"SessionStorage not available\")\n  self.store=window.sessionStorage\n  \nif has_session_storage:\n storage=SessionStorage()\n", ["browser", "browser.local_storage", "sys"]], "_sys": [".js", "var $module=(function($B){\n    var _b_ = $B.builtins\n    return {\n        // Called \"Getframe\" because \"_getframe\" wouldn't be imported in\n        // sys.py with \"from _sys import *\"\n        Getframe : function(depth){\n            return $B._frame.$factory($B.frames_stack, depth)\n        },\n        modules :\n            {'__get__':function(){\n                console.log(\"get sys.modules\")\n                return $B.obj_dict($B.imported)\n            },\n             '__set__':function(self, obj, value){ throw _b_.TypeError(\"Read only property 'sys.modules'\") }\n            },\n        path:\n            {'__get__':function(){return $B.path},\n             '__set__':function(self, obj, value){ $B.path = value }\n            },\n        meta_path:\n            {'__get__':function(){return $B.meta_path},\n             '__set__':function(self, obj, value){ $B.meta_path = value }\n            },\n        path_hooks:\n            {'__get__':function(){return $B.path_hooks},\n             '__set__':function(self, obj, value){ $B.path_hooks = value }\n            },\n        path_importer_cache:\n            {'__get__':function(){\n                return _b_.dict.$factory($B.JSObject.$factory($B.path_importer_cache))\n            },\n             '__set__':function(self, obj, value){\n                 throw _b_.TypeError(\"Read only property 'sys.path_importer_cache'\")\n            }\n        },\n        stderr : {\n            __get__:function(){return $B.stderr},\n            __set__:function(self, obj, value){$B.stderr = value},\n            write:function(data){_b_.getattr($B.stderr,\"write\")(data)}\n            },\n        stdout : {\n            __get__:function(){return $B.stdout},\n            __set__:function(self, obj, value){$B.stdout = value},\n            write:function(data){_b_.getattr($B.stdout,\"write\")(data)}\n            },\n        stdin : $B.stdin\n    }\n})(__BRYTHON__)\n"], "browser.html": [".py", "from _html import *\n", ["_html"]]}
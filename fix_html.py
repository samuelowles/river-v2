import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

bad_style = ' style="background: rgba(26,43,72,0.1); border: 1px solid rgba(255,255,255,0.3);"'
html = html.replace(bad_style, '')

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)

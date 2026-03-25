import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

with codecs.open('gaco.svg', 'r', 'utf-8') as f:
    svg_raw = f.read()

svg_clean = re.sub(r'<\?xml.*?\?>\s*', '', svg_raw, flags=re.DOTALL)
svg_clean = re.sub(r'<defs>.*?</defs>\s*', '', svg_clean, flags=re.DOTALL)
svg_clean = svg_clean.replace('class="cls-1"', 'class="gaco-path"')

svg_tag_match = re.search(r'<svg.*?>', svg_clean, flags=re.DOTALL)
if svg_tag_match:
    original_svg_tag = svg_tag_match.group(0)
    new_svg_tag = '<svg class="gaco-svg" viewBox="0 0 399.18 333.41" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">'
    svg_clean = svg_clean.replace(original_svg_tag, new_svg_tag)

def img_replacer(match):
    return f'<div class="gaco-instance">\n{svg_clean}\n</div>'

html = re.sub(r'<img[^>]*class="gaco-instance"[^>]*>', img_replacer, html)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)

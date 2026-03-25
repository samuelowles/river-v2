import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

old_link = '<a href="#" class="header__link">Register Investment Interest</a>'
new_btn = '''<form class="waitlist-form is-idle waitlist-form--sm" action="#" method="POST">
          <div class="waitlist-form__inner cta cta--sm" style="background: rgba(26,43,72,0.1); border: 1px solid rgba(255,255,255,0.3);">
            <input type="email" class="waitlist-form__input" placeholder="Your email..." required aria-label="Email address" />
            <button type="submit" class="waitlist-form__btn" aria-label="Submit">
              <span class="waitlist-form__text">Investors</span>
              <span class="waitlist-form__arrow">&#8594;</span>
            </button>
          </div>
        </form>'''

html = html.replace(old_link, new_btn)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)

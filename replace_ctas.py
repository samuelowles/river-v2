import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

header_cta = '''<button class="cta cta--sm waitlist-trigger" type="button">Join Waitlist</button>'''
header_form = '''<form class="waitlist-form is-idle waitlist-form--sm" action="#" method="POST">
          <div class="waitlist-form__inner cta cta--sm">
            <input type="email" class="waitlist-form__input" placeholder="Your email..." required aria-label="Email address" />
            <button type="submit" class="waitlist-form__btn" aria-label="Submit">
              <span class="waitlist-form__text">Join Waitlist</span>
              <span class="waitlist-form__arrow">&#8594;</span>
            </button>
          </div>
        </form>'''
html = html.replace(header_cta, header_form)

product_cta = '''<a href="#" class="cta reveal" id="cta-product">Join the waitlist</a>'''
product_form = '''<form class="waitlist-form is-idle reveal" id="cta-product" action="#" method="POST">
            <div class="waitlist-form__inner cta">
              <input type="email" class="waitlist-form__input" placeholder="Your email address..." required aria-label="Email address" />
              <button type="submit" class="waitlist-form__btn" aria-label="Submit">
                <span class="waitlist-form__text">Join the waitlist</span>
                <span class="waitlist-form__arrow">&#8594;</span>
              </button>
            </div>
          </form>'''
html = html.replace(product_cta, product_form)

footer_cta = '''<a href="#" class="cta cta--light reveal" id="cta-footer" style="transition-delay: 200ms">Join the waitlist</a>'''
footer_form = '''<form class="waitlist-form waitlist-form--light is-idle reveal" id="cta-footer" style="transition-delay: 200ms" action="#" method="POST">
      <div class="waitlist-form__inner cta cta--light">
        <input type="email" class="waitlist-form__input" placeholder="Your email address..." required aria-label="Email address" />
        <button type="submit" class="waitlist-form__btn" aria-label="Submit">
          <span class="waitlist-form__text">Join the waitlist</span>
          <span class="waitlist-form__arrow">&#8594;</span>
        </button>
      </div>
    </form>'''
html = html.replace(footer_cta, footer_form)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)

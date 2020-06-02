// Required for Bootstrap
import * as $ from 'jquery'
import * as popper from 'popper.js'
import * as bootstrap from 'bootstrap'
export { $, popper, bootstrap }

import { renderCats } from './cats'
import { getArticles } from './articles'
import { renderCategoryDropdown } from './nav'

// renderCats() 
renderCategoryDropdown()
getArticles()
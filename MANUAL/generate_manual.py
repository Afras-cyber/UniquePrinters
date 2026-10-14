"""
User Manual Generator for Unique Printers
Generates a professional .docx user manual
"""

from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import datetime

# -------------------------------------------------------------------
# Helpers
# -------------------------------------------------------------------
def set_cell_bg(cell, hex_color):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    tcPr.append(shd)


def add_horizontal_rule(doc):
    para = doc.add_paragraph()
    para.paragraph_format.space_before = Pt(4)
    para.paragraph_format.space_after = Pt(4)
    pPr = para._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '6')
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), 'D8590E')
    pBdr.append(bottom)
    pPr.append(pBdr)
    return para


def add_colored_heading(doc, text, level=1, color="D8590E"):
    heading = doc.add_heading(text, level=level)
    for run in heading.runs:
        run.font.color.rgb = RGBColor.from_string(color)
    return heading


def add_info_box(doc, text, bg_hex="FFF4EC", border_hex="D8590E"):
    """Add a shaded info box paragraph."""
    para = doc.add_paragraph()
    para.paragraph_format.left_indent = Inches(0.2)
    para.paragraph_format.right_indent = Inches(0.2)
    para.paragraph_format.space_before = Pt(6)
    para.paragraph_format.space_after = Pt(6)
    run = para.add_run(text)
    run.font.size = Pt(11)
    run.font.italic = True
    return para


def add_step(doc, number, title, description):
    """Add a numbered step."""
    p = doc.add_paragraph(style='List Number')
    run_title = p.add_run(f"{title}: ")
    run_title.bold = True
    run_title.font.size = Pt(11)
    run_desc = p.add_run(description)
    run_desc.font.size = Pt(11)
    return p


def add_bullet(doc, text, level=0):
    p = doc.add_paragraph(text, style='List Bullet')
    p.paragraph_format.left_indent = Inches(0.3 + level * 0.2)
    return p


def add_table_row(table, cells, header=False, bg_hex=None):
    row = table.add_row()
    for i, (cell, text) in enumerate(zip(row.cells, cells)):
        cell.text = text
        for para in cell.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
                if header:
                    run.bold = True
                    run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        if bg_hex:
            set_cell_bg(cell, bg_hex)
    return row


# -------------------------------------------------------------------
# Document setup
# -------------------------------------------------------------------
doc = Document()

# Page margins
for section in doc.sections:
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.5)
    section.left_margin = Cm(2.8)
    section.right_margin = Cm(2.8)

# Default styles
style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(11)

for lvl in range(1, 4):
    h_style = doc.styles[f'Heading {lvl}']
    h_style.font.name = 'Calibri'
    h_style.font.bold = True
    sizes = {1: 20, 2: 15, 3: 13}
    h_style.font.size = Pt(sizes.get(lvl, 12))

# -------------------------------------------------------------------
# COVER PAGE
# -------------------------------------------------------------------
doc.add_paragraph()
doc.add_paragraph()
doc.add_paragraph()

title_para = doc.add_paragraph()
title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = title_para.add_run("UNIQUE PRINTERS")
run.bold = True
run.font.size = Pt(32)
run.font.color.rgb = RGBColor(0xD8, 0x59, 0x0E)
run.font.name = 'Calibri'

subtitle_para = doc.add_paragraph()
subtitle_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run2 = subtitle_para.add_run("Printers, Stationery & Books")
run2.font.size = Pt(18)
run2.font.color.rgb = RGBColor(0x1D, 0x9E, 0x75)
run2.font.name = 'Calibri'

doc.add_paragraph()

manual_para = doc.add_paragraph()
manual_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run3 = manual_para.add_run("USER MANUAL")
run3.bold = True
run3.font.size = Pt(24)
run3.font.color.rgb = RGBColor(0x2C, 0x2C, 0x2A)
run3.font.name = 'Calibri'

doc.add_paragraph()

url_para = doc.add_paragraph()
url_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run4 = url_para.add_run("🌐  https://uniqueprinters.vercel.app/")
run4.font.size = Pt(13)
run4.font.color.rgb = RGBColor(0x1D, 0x9E, 0x75)
run4.font.name = 'Calibri'

doc.add_paragraph()
doc.add_paragraph()

contact_para = doc.add_paragraph()
contact_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run5 = contact_para.add_run(
    "No 571/2, Meegahagodalla, Thalduwa, Avissawella\n"
    "Western Province, Sri Lanka\n"
    "📞  +94 76 383 6945\n"
    "💬  WhatsApp: +94763836945"
)
run5.font.size = Pt(12)
run5.font.color.rgb = RGBColor(0x5F, 0x5E, 0x5A)
run5.font.name = 'Calibri'

doc.add_paragraph()
doc.add_paragraph()

version_para = doc.add_paragraph()
version_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
version_run = version_para.add_run(
    f"Version 1.0  |  Prepared: {datetime.date.today().strftime('%B %Y')}"
)
version_run.font.size = Pt(10)
version_run.font.color.rgb = RGBColor(0xB4, 0xB2, 0xA9)
version_run.font.name = 'Calibri'

doc.add_page_break()

# -------------------------------------------------------------------
# TABLE OF CONTENTS (manual — no TOC field)
# -------------------------------------------------------------------
add_colored_heading(doc, "Table of Contents", level=1)

toc_items = [
    ("1", "Introduction", "3"),
    ("2", "Getting Started", "4"),
    ("3", "Navigating the Website", "5"),
    ("4", "Products & Services", "7"),
    ("5", "Books Showcase", "9"),
    ("6", "Search & Filter", "11"),
    ("7", "WhatsApp Enquiry", "12"),
    ("8", "Contact & Shop Info", "13"),
    ("9", "Dark Mode & Display Preferences", "14"),
    ("10", "Announcement Banner", "15"),
    ("11", "Admin Dashboard", "16"),
    ("12", "Managing Products", "18"),
    ("13", "Managing Books", "20"),
    ("14", "Managing Offers & Banners", "22"),
    ("15", "Shop Settings & Configuration", "23"),
    ("16", "Troubleshooting", "25"),
    ("17", "FAQs", "26"),
    ("18", "Contact & Support", "27"),
]

toc_table = doc.add_table(rows=0, cols=3)
toc_table.style = 'Table Grid'
# Header
hdr = toc_table.add_row()
for i, txt in enumerate(["#", "Section", "Page"]):
    hdr.cells[i].text = txt
    for para in hdr.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr.cells[i], "D8590E")

for no, section, page in toc_items:
    row = toc_table.add_row()
    row.cells[0].text = no
    row.cells[1].text = section
    row.cells[2].text = page
    for c in row.cells:
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)

doc.add_page_break()

# ===================================================================
# SECTION 1 — INTRODUCTION
# ===================================================================
add_colored_heading(doc, "1. Introduction", level=1)
add_horizontal_rule(doc)

intro_text = (
    "Welcome to the Unique Printers User Manual. This guide explains how to use the Unique Printers "
    "website — both as a customer browsing the catalog and as a shop owner managing the site through "
    "the Admin Dashboard.\n\n"
    "Unique Printers is a local stationery, printing, and bookshop located in Avissawella, "
    "Sri Lanka. The website is designed to let customers explore products and services from home, "
    "enquire via WhatsApp, and find all the shop details they need — without needing to make a trip first."
)
intro_para = doc.add_paragraph(intro_text)
intro_para.paragraph_format.space_after = Pt(8)

add_colored_heading(doc, "1.1 Who Is This Manual For?", level=2)
add_bullet(doc, "Customers — browsing products, books, and services online")
add_bullet(doc, "Shop Owner / Admin — managing products, categories, offers, and site settings")
add_bullet(doc, "Staff Members — day-to-day updates and stock management")

add_colored_heading(doc, "1.2 Website at a Glance", level=2)

glance_table = doc.add_table(rows=0, cols=2)
glance_table.style = 'Table Grid'
hdr2 = glance_table.add_row()
for i, txt in enumerate(["Feature", "Description"]):
    hdr2.cells[i].text = txt
    for para in hdr2.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr2.cells[i], "1D9E75")

glance_rows = [
    ("Live URL", "https://uniqueprinters.vercel.app/"),
    ("Type", "Catalog / Showcase website (no online checkout)"),
    ("Services", "Printing, Scanning, Photocopy, Typing, Reload"),
    ("Products", "Books, Stationery Items, Toys"),
    ("Platform", "React + Vite + Supabase, hosted on Vercel"),
    ("Contact Phone", "+94 76 383 6945"),
    ("WhatsApp", "+94763836945"),
    ("Address", "No 571/2, Meegahagodalla, Thalduwa, Avissawella"),
]
alt = False
for feat, desc in glance_rows:
    row = glance_table.add_row()
    row.cells[0].text = feat
    row.cells[1].text = desc
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

doc.add_page_break()

# ===================================================================
# SECTION 2 — GETTING STARTED
# ===================================================================
add_colored_heading(doc, "2. Getting Started", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "You do not need to create an account or log in to browse the Unique Printers website. "
    "Simply open the URL in any web browser on your phone, tablet, or computer."
)

add_colored_heading(doc, "2.1 Accessing the Website", level=2)
add_step(doc, 1, "Open your browser", "Use Google Chrome, Safari, Firefox, or any modern browser.")
add_step(doc, 2, "Go to the URL", "Type https://uniqueprinters.vercel.app/ in the address bar and press Enter.")
add_step(doc, 3, "Browse freely", "No account or login is needed for customers.")

add_info_box(doc,
    "💡 Tip: Bookmark the website for quick access next time! "
    "On mobile, you can also use 'Add to Home Screen' in your browser for an app-like experience.")

add_colored_heading(doc, "2.2 Supported Devices & Browsers", level=2)
devices_table = doc.add_table(rows=0, cols=3)
devices_table.style = 'Table Grid'
hdr3 = devices_table.add_row()
for i, txt in enumerate(["Device", "Recommended Browser", "Notes"]):
    hdr3.cells[i].text = txt
    for para in hdr3.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr3.cells[i], "D8590E")

device_rows = [
    ("Smartphone (Android)", "Google Chrome", "Full feature support"),
    ("Smartphone (iPhone)", "Safari or Chrome", "Full feature support"),
    ("Tablet", "Any modern browser", "Full feature support"),
    ("Laptop / Desktop", "Chrome, Firefox, Edge, Safari", "Best experience"),
]
for device, browser, note in device_rows:
    row = devices_table.add_row()
    row.cells[0].text = device
    row.cells[1].text = browser
    row.cells[2].text = note
    for c in row.cells:
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)

doc.add_paragraph()
doc.add_paragraph(
    "The website is fully responsive and adapts to any screen size. "
    "All buttons and touch targets are sized for easy tapping on mobile devices."
)

doc.add_page_break()

# ===================================================================
# SECTION 3 — NAVIGATING THE WEBSITE
# ===================================================================
add_colored_heading(doc, "3. Navigating the Website", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "The website has a clear, easy-to-use layout. Below is an overview of all major sections "
    "you will encounter as you browse."
)

add_colored_heading(doc, "3.1 Header & Navigation Bar", level=2)
doc.add_paragraph(
    "The navigation bar is always visible at the top of every page. It contains:"
)
add_bullet(doc, "Shop Logo / Name — Click to return to the Home page at any time")
add_bullet(doc, "Navigation Links — Quick access to Home, Products, Books, Services, Contact")
add_bullet(doc, "Search Icon (🔍) — Opens the Global Search to find any product or book instantly")
add_bullet(doc, "Dark Mode Toggle (☀️/🌙) — Switch between light and dark display mode")
add_bullet(doc, "Mobile Menu (☰) — On phones, tap the hamburger icon to open the full menu")

add_info_box(doc,
    "📌 On mobile devices, the navigation collapses into a hamburger menu (☰). "
    "Tap it to expand the full menu and access all pages.")

add_colored_heading(doc, "3.2 Home Page", level=2)
doc.add_paragraph(
    "The Home page is the first thing visitors see. It contains:"
)
add_bullet(doc, "Hero Banner — A welcoming banner with the shop name, tagline, and main call-to-action")
add_bullet(doc, "Announcement Banner (if active) — Time-sensitive notices such as closures or special hours")
add_bullet(doc, "Featured Products — Highlighted products selected by the shop owner")
add_bullet(doc, "Current Offers — Special deals or promotions")
add_bullet(doc, "Service Highlights — Quick overview of services (Printing, Scanning, etc.)")
add_bullet(doc, "Category Quick-Links — Tap a category to jump directly to that section")

add_colored_heading(doc, "3.3 Page Structure Overview", level=2)
nav_table = doc.add_table(rows=0, cols=3)
nav_table.style = 'Table Grid'
hdr_nav = nav_table.add_row()
for i, txt in enumerate(["Page / Section", "URL Path", "Purpose"]):
    hdr_nav.cells[i].text = txt
    for para in hdr_nav.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_nav.cells[i], "1D9E75")

nav_rows = [
    ("Home", "/", "Landing page with hero, offers, featured products"),
    ("Products", "/products", "Full product catalog with filters"),
    ("Books", "/books", "Books showcase with search & filter"),
    ("Book Detail", "/books/:id", "Individual book page with details"),
    ("Services", "/services", "Service info cards (Printing, Scanning, etc.)"),
    ("Contact / Shop Info", "/contact", "Address, map, phone, hours, enquiry form"),
    ("Admin Login", "/admin", "Shop owner login (password protected)"),
    ("Admin Dashboard", "/admin/dashboard", "Product/category/settings management"),
]
alt = False
for page, path, purpose in nav_rows:
    row = nav_table.add_row()
    row.cells[0].text = page
    row.cells[1].text = path
    row.cells[2].text = purpose
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "3.4 Footer", level=2)
doc.add_paragraph(
    "The footer appears at the bottom of every page and contains:"
)
add_bullet(doc, "Shop name, address, and phone number")
add_bullet(doc, "Business hours — Mon–Fri: 8:30 AM–6:30 PM | Saturday: 8:30 AM–5:00 PM | Sunday: Closed")
add_bullet(doc, "Social media links (Facebook, Instagram, TikTok)")
add_bullet(doc, "Quick navigation links to main pages")
add_bullet(doc, "Copyright notice")

doc.add_page_break()

# ===================================================================
# SECTION 4 — PRODUCTS & SERVICES
# ===================================================================
add_colored_heading(doc, "4. Products & Services", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "Unique Printers offers both physical products for purchase and in-store services. "
    "These are organized into categories that you can browse from the Products or Services pages."
)

add_colored_heading(doc, "4.1 Service Categories", level=2)
doc.add_paragraph(
    "Services are in-person services offered at the shop. They are displayed as information cards — "
    "not for online purchase. Each service card shows a short description and a 'Visit Us' or "
    "WhatsApp enquiry button."
)

svc_table = doc.add_table(rows=0, cols=3)
svc_table.style = 'Table Grid'
hdr_svc = svc_table.add_row()
for i, txt in enumerate(["Service", "Description", "Action"]):
    hdr_svc.cells[i].text = txt
    for para in hdr_svc.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_svc.cells[i], "D8590E")

services = [
    ("Printing", "Document and photo printing in black & white or color", "Visit us / WhatsApp"),
    ("Scanning", "Scan documents to digital files or email", "Visit us / WhatsApp"),
    ("Photocopy", "Black & white and color photocopying", "Visit us / WhatsApp"),
    ("Typing", "Document typing and formatting assistance", "Visit us / WhatsApp"),
    ("Reload", "Mobile phone credit reload / top-up service", "Visit us / WhatsApp"),
]
alt = False
for svc, desc, action in services:
    row = svc_table.add_row()
    row.cells[0].text = svc
    row.cells[1].text = desc
    row.cells[2].text = action
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "4.2 Product Categories", level=2)
doc.add_paragraph(
    "Product categories have browsable listings with prices and stock status. "
    "Tap any product card to see full details."
)

prod_table = doc.add_table(rows=0, cols=3)
prod_table.style = 'Table Grid'
hdr_prod = prod_table.add_row()
for i, txt in enumerate(["Category", "Description", "Online Features"]):
    hdr_prod.cells[i].text = txt
    for para in hdr_prod.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_prod.cells[i], "1D9E75")

products = [
    ("Books", "Fiction, non-fiction, textbooks, kids' books, exam guides", "Dedicated showcase page with full details"),
    ("Stationery Items", "Pens, notebooks, office & school supplies", "Product listing with price & stock status"),
    ("Toys", "Kids' toys and stationery-adjacent items", "Product listing with price & stock status"),
]
alt = False
for prod, desc, features in products:
    row = prod_table.add_row()
    row.cells[0].text = prod
    row.cells[1].text = desc
    row.cells[2].text = features
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "4.3 Product Card Information", level=2)
doc.add_paragraph(
    "Every product card in the listing shows:"
)
add_bullet(doc, "Product Image")
add_bullet(doc, "Product Name")
add_bullet(doc, "Price (in LKR)")
add_bullet(doc, "Stock Status badge — In Stock (green) / Low Stock (orange) / Out of Stock (red)")
add_bullet(doc, "Category tag")

doc.add_paragraph()
doc.add_paragraph(
    "Clicking or tapping a product card opens the Product Detail Page, which shows:"
)
add_bullet(doc, "Larger product images (tap to zoom)")
add_bullet(doc, "Full description")
add_bullet(doc, "Price and availability")
add_bullet(doc, "WhatsApp Enquiry button pre-filled with the product name")
add_bullet(doc, "Related products section")

doc.add_page_break()

# ===================================================================
# SECTION 5 — BOOKS SHOWCASE
# ===================================================================
add_colored_heading(doc, "5. Books Showcase", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "The Books Showcase is a dedicated section of the website designed specifically for the shop's book collection. "
    "Customers can browse books from home before visiting, check availability, and enquire via WhatsApp."
)

add_colored_heading(doc, "5.1 Accessing the Books Page", level=2)
add_step(doc, 1, "Click 'Books'", "In the navigation bar or from the Home page category links.")
add_step(doc, 2, "Browse the collection", "All available books are displayed as cards.")
add_step(doc, 3, "Use filters or search", "Narrow down by genre, status, price, or author name.")

add_colored_heading(doc, "5.2 Book Card Details", level=2)
doc.add_paragraph("Each book card displays:")
add_bullet(doc, "Cover Image — Front cover of the book")
add_bullet(doc, "Title — Name of the book")
add_bullet(doc, "Author — Author's name")
add_bullet(doc, "Price — In LKR (Sri Lankan Rupees)")
add_bullet(doc, "Status Tag — Colored badge on the cover image")
add_bullet(doc, "Genre / Category — e.g. Kids, Fiction, Textbooks, Exam Guides")

add_colored_heading(doc, "5.3 Book Status Tags", level=2)
doc.add_paragraph("Books are labeled with status tags to help customers identify what to look for:")

tags_table = doc.add_table(rows=0, cols=3)
tags_table.style = 'Table Grid'
hdr_tags = tags_table.add_row()
for i, txt in enumerate(["Status Tag", "Color", "Meaning"]):
    hdr_tags.cells[i].text = txt
    for para in hdr_tags.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_tags.cells[i], "D8590E")

tags = [
    ("New Arrival", "Blue (Info)", "Recently added to the collection"),
    ("Most Popular", "Pink (Accent)", "Frequently requested or browsed"),
    ("Best Seller", "Green (Success)", "Top-selling book in the shop"),
    ("Limited Stock", "Orange (Warning)", "Very few copies remaining — act fast"),
    ("Out of Stock", "Red (Danger)", "Currently not available — check again soon"),
]
alt = False
for tag, color, meaning in tags:
    row = tags_table.add_row()
    row.cells[0].text = tag
    row.cells[1].text = color
    row.cells[2].text = meaning
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "5.4 Book Detail Page", level=2)
doc.add_paragraph("Tapping a book card opens its detail page, which shows:")
add_bullet(doc, "Large cover image (tap to zoom)")
add_bullet(doc, "Full title, author, genre, and price")
add_bullet(doc, "Status tag and availability (In Stock / Out of Stock)")
add_bullet(doc, "Description / synopsis of the book")
add_bullet(doc, "WhatsApp Enquiry button — pre-filled with the book title (e.g. 'Hi, I'd like to ask about [Book Title]')")
add_bullet(doc, "Related Books section — other books from the same genre or author")

add_colored_heading(doc, "5.5 Filtering & Sorting Books", level=2)
doc.add_paragraph("On the Books page, customers can refine the listing using:")
add_bullet(doc, "Filter by Status — Show only 'New Arrivals', 'Best Sellers', 'Most Popular', etc.")
add_bullet(doc, "Filter by Genre — Kids, Fiction, Textbooks, Exam Guides, etc.")
add_bullet(doc, "Sort by Price — Lowest to highest or highest to lowest")
add_bullet(doc, "Sort by Newest — Most recently added books first")
add_bullet(doc, "Search by Title or Author — Type in the search box to find a specific book")

doc.add_page_break()

# ===================================================================
# SECTION 6 — SEARCH & FILTER
# ===================================================================
add_colored_heading(doc, "6. Search & Filter", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "The website includes a Global Search feature that lets customers find any product, book, "
    "or category instantly from anywhere on the site."
)

add_colored_heading(doc, "6.1 Global Search", level=2)
add_step(doc, 1, "Click the Search icon (🔍)", "Located in the top navigation bar on every page.")
add_step(doc, 2, "Type your query", "Enter a product name, book title, author, or category.")
add_step(doc, 3, "View results", "Results appear instantly as you type.")
add_step(doc, 4, "Click a result", "Navigate directly to that product or book's page.")

add_info_box(doc,
    "🔍 The search works across all products, books, and categories. "
    "Try searching for 'pen', 'notebook', or a book title to see it in action.")

add_colored_heading(doc, "6.2 Category Filters", level=2)
doc.add_paragraph(
    "On the Products page, you can filter by category using filter chips/tabs at the top of the listing:"
)
add_bullet(doc, "Click 'All' to see all products")
add_bullet(doc, "Click a specific category (e.g. 'Stationery Items', 'Toys') to see only that category")
add_bullet(doc, "The active filter is highlighted with the brand's primary color")
add_bullet(doc, "Category filters animate smoothly when selected")

add_colored_heading(doc, "6.3 Sort Options", level=2)
doc.add_paragraph("Products can be sorted using the sort dropdown:")
add_bullet(doc, "Newest — Most recently added products first (default)")
add_bullet(doc, "Price: Low to High — Cheapest products first")
add_bullet(doc, "Price: High to Low — Most expensive products first")
add_bullet(doc, "Alphabetical — A to Z by product name")

doc.add_page_break()

# ===================================================================
# SECTION 7 — WHATSAPP ENQUIRY
# ===================================================================
add_colored_heading(doc, "7. WhatsApp Enquiry", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "Unique Printers makes it easy to contact the shop via WhatsApp — no need to save a number "
    "or type a message from scratch."
)

add_colored_heading(doc, "7.1 Floating WhatsApp Button", level=2)
doc.add_paragraph(
    "A WhatsApp icon button is always visible in the bottom-right corner of every page. "
    "Tapping it will open a chat with the shop instantly."
)
add_bullet(doc, "On mobile — Opens the WhatsApp app directly")
add_bullet(doc, "On desktop — Opens WhatsApp Web in a new browser tab")
add_bullet(doc, "A pre-filled starter message is included so you don't need to type an opener")

add_colored_heading(doc, "7.2 Product & Book Enquiry Buttons", level=2)
doc.add_paragraph(
    "Individual product and book detail pages also have a 'WhatsApp Enquiry' button. "
    "These buttons automatically include the product or book name in the message, "
    "so the shop knows exactly what you're enquiring about."
)

add_info_box(doc, 
    "💬 Example pre-filled message for a product:\n"
    "     'Hi, I'd like to ask about [Product Name] from your shop.'\n\n"
    "💬 Example pre-filled message for a book:\n"
    "     'Hi, I'd like to ask about [Book Title] from your shop.'")

add_colored_heading(doc, "7.3 WhatsApp Contact Details", level=2)
contact_table = doc.add_table(rows=0, cols=2)
contact_table.style = 'Table Grid'
for i, txt in enumerate(["Item", "Details"]):
    hdr_contact = contact_table.add_row()
    # Actually let's just add rows directly
    break

contact_table = doc.add_table(rows=0, cols=2)
contact_table.style = 'Table Grid'
hdr_ct = contact_table.add_row()
for i, txt in enumerate(["Item", "Details"]):
    hdr_ct.cells[i].text = txt
    for para in hdr_ct.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_ct.cells[i], "1D9E75")

ct_rows = [
    ("WhatsApp Number", "+94763836945"),
    ("Direct WhatsApp Link", "https://wa.me/+94763836945"),
    ("Default Message", "Hi, I'm interested in a product from your shop."),
]
for item, detail in ct_rows:
    row = contact_table.add_row()
    row.cells[0].text = item
    row.cells[1].text = detail
    for c in row.cells:
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)

doc.add_page_break()

# ===================================================================
# SECTION 8 — CONTACT & SHOP INFO
# ===================================================================
add_colored_heading(doc, "8. Contact & Shop Information", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "The Contact page provides all the information customers need to visit or get in touch with the shop."
)

add_colored_heading(doc, "8.1 Shop Details", level=2)
shop_table = doc.add_table(rows=0, cols=2)
shop_table.style = 'Table Grid'
hdr_shop = shop_table.add_row()
for i, txt in enumerate(["Detail", "Information"]):
    hdr_shop.cells[i].text = txt
    for para in hdr_shop.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_shop.cells[i], "D8590E")

shop_info = [
    ("Shop Name", "Unique Printers"),
    ("Address", "No 571/2, Meegahagodalla, Thalduwa, Avissawella, Western Province, Sri Lanka"),
    ("Phone", "+94 76 383 6945"),
    ("WhatsApp", "+94763836945"),
    ("Monday – Friday", "8:30 AM – 6:30 PM"),
    ("Saturday", "8:30 AM – 5:00 PM"),
    ("Sunday", "Closed"),
]
alt = False
for detail, info in shop_info:
    row = shop_table.add_row()
    row.cells[0].text = detail
    row.cells[1].text = info
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "8.2 Enquiry Form", level=2)
doc.add_paragraph(
    "The Contact page includes an online enquiry form where customers can submit questions "
    "or messages directly. Fill in your name, contact number or email, your message, and click Send."
)
add_info_box(doc,
    "📋 Enquiry form submissions are stored securely and the shop owner is notified. "
    "For faster responses, use the WhatsApp button instead.")

add_colored_heading(doc, "8.3 Map", level=2)
doc.add_paragraph(
    "An embedded Google Map on the Contact page shows the exact shop location. "
    "Tap the map to open Google Maps on your device for directions."
)

doc.add_page_break()

# ===================================================================
# SECTION 9 — DARK MODE
# ===================================================================
add_colored_heading(doc, "9. Dark Mode & Display Preferences", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "Unique Printers supports both Light Mode and Dark Mode. Your preference is saved automatically "
    "and remembered every time you visit."
)

add_colored_heading(doc, "9.1 Switching Themes", level=2)
add_step(doc, 1, "Locate the theme toggle", "Look for the ☀️ (sun) or 🌙 (moon) icon in the top navigation bar.")
add_step(doc, 2, "Click or tap the icon", "The site switches between light and dark mode instantly.")
add_step(doc, 3, "Your preference is saved", "The next time you visit, the site will remember your choice.")

add_colored_heading(doc, "9.2 Automatic System Preference", level=2)
doc.add_paragraph(
    "On your first visit, the website automatically detects your device's display setting "
    "(System Preference). If your phone or computer is in dark mode, the website will match it. "
    "You can always override this manually using the toggle."
)

add_colored_heading(doc, "9.3 Color Themes", level=2)
theme_table = doc.add_table(rows=0, cols=3)
theme_table.style = 'Table Grid'
hdr_theme = theme_table.add_row()
for i, txt in enumerate(["Element", "Light Mode", "Dark Mode"]):
    hdr_theme.cells[i].text = txt
    for para in hdr_theme.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_theme.cells[i], "1D9E75")

theme_rows = [
    ("Background", "#FFFFFF (White)", "#1A1A18 (Near Black)"),
    ("Primary Color", "#D8590E (Orange)", "#F2A15E (Light Orange)"),
    ("Secondary Color", "#1D9E75 (Green)", "#5DCAA5 (Mint)"),
    ("Text", "#2C2C2A (Dark)", "#F1EFE8 (Off-white)"),
]
for elem, light, dark in theme_rows:
    row = theme_table.add_row()
    row.cells[0].text = elem
    row.cells[1].text = light
    row.cells[2].text = dark
    for c in row.cells:
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)

doc.add_page_break()

# ===================================================================
# SECTION 10 — ANNOUNCEMENT BANNER
# ===================================================================
add_colored_heading(doc, "10. Announcement Banner", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "The Announcement Banner is a small, prominent notice that appears at the very top of the website "
    "to inform customers about important time-sensitive information."
)

add_colored_heading(doc, "10.1 What the Banner Is Used For", level=2)
add_bullet(doc, "Shop closures (e.g. 'We will be closed on 26th October')")
add_bullet(doc, "Early closings (e.g. 'Closing early today at 4 PM')")
add_bullet(doc, "Holiday notices (e.g. 'Tomorrow the shop is closed')")
add_bullet(doc, "Special promotions or events")
add_bullet(doc, "Delivery or service delays")

add_colored_heading(doc, "10.2 Banner Types", level=2)
banner_table = doc.add_table(rows=0, cols=3)
banner_table.style = 'Table Grid'
hdr_banner = banner_table.add_row()
for i, txt in enumerate(["Type", "Color", "When to Use"]):
    hdr_banner.cells[i].text = txt
    for para in hdr_banner.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_banner.cells[i], "D8590E")

banner_types = [
    ("Info", "Blue / Neutral", "General notices, delivery notes, event announcements"),
    ("Urgent", "Red / Amber", "Shop closed today, emergency notices, immediate alerts"),
]
for btype, color, when in banner_types:
    row = banner_table.add_row()
    row.cells[0].text = btype
    row.cells[1].text = color
    row.cells[2].text = when
    for c in row.cells:
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)

add_colored_heading(doc, "10.3 How Customers See the Banner", level=2)
add_bullet(doc, "The banner appears above or just below the navigation bar")
add_bullet(doc, "It is visible on every page of the website")
add_bullet(doc, "Customers can dismiss it (✕ close button) — it will reappear on their next visit if still active")
add_bullet(doc, "The banner automatically disappears after the set end date")
add_bullet(doc, "On mobile it stays compact and single-line so content isn't pushed down")

add_info_box(doc,
    "🛠️ For shop owners: The announcement banner is managed from the Admin Dashboard. "
    "See Section 14 — Managing Offers & Banners for instructions.")

doc.add_page_break()

# ===================================================================
# SECTION 11 — ADMIN DASHBOARD (OVERVIEW)
# ===================================================================
add_colored_heading(doc, "11. Admin Dashboard — Overview", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "The Admin Dashboard is a private, password-protected area of the website where the shop owner "
    "and authorized staff can manage all content — products, books, offers, categories, and shop settings — "
    "without needing to touch any code."
)

add_colored_heading(doc, "11.1 Accessing the Admin Dashboard", level=2)
add_step(doc, 1, "Go to the admin URL", "Navigate to https://uniqueprinters.vercel.app/admin")
add_step(doc, 2, "Enter your credentials", "Use the email and password provided during setup.")
add_step(doc, 3, "Click 'Sign In'", "You will be redirected to the Dashboard home.")
add_step(doc, 4, "Sign out when done", "Click your profile icon or 'Sign Out' to log out securely.")

add_info_box(doc,
    "🔒 The Admin Dashboard is secured with Supabase Authentication. "
    "Never share your admin password. If you forget it, use the 'Forgot Password' link on the login page.")

add_colored_heading(doc, "11.2 Dashboard Sections", level=2)
dash_table = doc.add_table(rows=0, cols=3)
dash_table.style = 'Table Grid'
hdr_dash = dash_table.add_row()
for i, txt in enumerate(["Dashboard Section", "What You Can Do", "Manual Section"]):
    hdr_dash.cells[i].text = txt
    for para in hdr_dash.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_dash.cells[i], "1D9E75")

dash_sections = [
    ("Products", "Add, edit, delete products; set price, stock, category, images", "Section 12"),
    ("Books", "Add, edit, delete books; set cover, price, author, genre, status tag", "Section 13"),
    ("Categories", "Add, rename, or remove product/service categories", "Section 12"),
    ("Offers & Banners", "Create promotions and manage the announcement banner", "Section 14"),
    ("Shop Settings", "Edit shop name, logo, address, hours, colors, social links", "Section 15"),
    ("Analytics", "View most-viewed products (Phase 2 feature)", "—"),
]
alt = False
for section, todo, ref in dash_sections:
    row = dash_table.add_row()
    row.cells[0].text = section
    row.cells[1].text = todo
    row.cells[2].text = ref
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

doc.add_page_break()

# ===================================================================
# SECTION 12 — MANAGING PRODUCTS
# ===================================================================
add_colored_heading(doc, "12. Managing Products", level=1)
add_horizontal_rule(doc)

add_colored_heading(doc, "12.1 Adding a New Product", level=2)
add_step(doc, 1, "Go to Admin Dashboard → Products", "Click 'Products' in the left sidebar.")
add_step(doc, 2, "Click 'Add Product'", "The Add Product form will open.")
add_step(doc, 3, "Fill in the details", "Enter product name, description, price, and select a category.")
add_step(doc, 4, "Set Stock Status", "Choose In Stock, Low Stock, or Out of Stock.")
add_step(doc, 5, "Upload an Image", "Click the image upload area and select a photo from your device.")
add_step(doc, 6, "Click 'Save'", "The product is published immediately on the storefront.")

add_colored_heading(doc, "12.2 Product Fields Reference", level=2)
fields_table = doc.add_table(rows=0, cols=3)
fields_table.style = 'Table Grid'
hdr_fields = fields_table.add_row()
for i, txt in enumerate(["Field", "Required?", "Description"]):
    hdr_fields.cells[i].text = txt
    for para in hdr_fields.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_fields.cells[i], "D8590E")

prod_fields = [
    ("Name", "Yes", "The product's display name (e.g. 'A4 Notebook')"),
    ("Description", "Recommended", "Short description of the product — what it is, key features"),
    ("Price", "Yes", "Price in LKR (Sri Lankan Rupees)"),
    ("Category", "Yes", "Select from existing categories (Stationery Items, Toys, etc.)"),
    ("Stock Status", "Yes", "In Stock / Low Stock / Out of Stock"),
    ("Image", "Recommended", "Product photo — uploaded to Supabase Storage"),
    ("Featured", "No", "Tick to show this product in the 'Featured Products' section on Home"),
]
alt = False
for field, req, desc in prod_fields:
    row = fields_table.add_row()
    row.cells[0].text = field
    row.cells[1].text = req
    row.cells[2].text = desc
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "12.3 Editing a Product", level=2)
add_step(doc, 1, "Go to Admin Dashboard → Products", "Find the product in the list.")
add_step(doc, 2, "Click the Edit icon (✏️)", "The edit form opens with existing details pre-filled.")
add_step(doc, 3, "Make your changes", "Update any fields as needed.")
add_step(doc, 4, "Click 'Save'", "Changes go live on the storefront immediately.")

add_colored_heading(doc, "12.4 Deleting a Product", level=2)
add_step(doc, 1, "Go to Admin Dashboard → Products", "Find the product.")
add_step(doc, 2, "Click the Delete icon (🗑️)", "A confirmation dialog appears.")
add_step(doc, 3, "Confirm deletion", "Click 'Yes, Delete' to permanently remove the product.")
add_info_box(doc,
    "⚠️ Warning: Deleting a product is permanent. If you just want to hide a product temporarily, "
    "set its stock status to 'Out of Stock' instead.")

add_colored_heading(doc, "12.5 Managing Categories", level=2)
doc.add_paragraph(
    "Categories can be managed from Admin Dashboard → Categories. You can:"
)
add_bullet(doc, "Add a new category — Give it a name and set the type (Service or Product)")
add_bullet(doc, "Rename an existing category — Click edit and update the name")
add_bullet(doc, "Reorder categories — Drag to change the display order")
add_bullet(doc, "Delete a category — Only if no products are assigned to it")

doc.add_page_break()

# ===================================================================
# SECTION 13 — MANAGING BOOKS
# ===================================================================
add_colored_heading(doc, "13. Managing Books", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "Books have their own dedicated management section in the admin dashboard, "
    "separate from regular products."
)

add_colored_heading(doc, "13.1 Adding a New Book", level=2)
add_step(doc, 1, "Go to Admin Dashboard → Books", "Click 'Books' in the left sidebar.")
add_step(doc, 2, "Click 'Add Book'", "The Add Book form opens.")
add_step(doc, 3, "Fill in all details", "Title, Author, Price, Genre, Status Tag, and Description.")
add_step(doc, 4, "Upload the Cover Image", "Select the book's front cover image from your device.")
add_step(doc, 5, "Set Stock Status", "In Stock or Out of Stock.")
add_step(doc, 6, "Click 'Save'", "The book appears on the Books Showcase page immediately.")

add_colored_heading(doc, "13.2 Book Fields Reference", level=2)
books_fields = doc.add_table(rows=0, cols=3)
books_fields.style = 'Table Grid'
hdr_bf = books_fields.add_row()
for i, txt in enumerate(["Field", "Required?", "Description"]):
    hdr_bf.cells[i].text = txt
    for para in hdr_bf.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_bf.cells[i], "1D9E75")

book_fields = [
    ("Title", "Yes", "Full title of the book"),
    ("Author", "Yes", "Author's full name"),
    ("Price", "Yes", "Price in LKR"),
    ("Genre / Category", "Yes", "e.g. Fiction, Kids, Textbooks, Exam Guides"),
    ("Status Tag", "Yes", "New Arrival / Most Popular / Best Seller / Limited Stock / Out of Stock"),
    ("Description", "Recommended", "Short synopsis or description of the book"),
    ("Cover Image", "Recommended", "Front cover photo of the book"),
    ("Stock Status", "Yes", "In Stock or Out of Stock"),
]
alt = False
for field, req, desc in book_fields:
    row = books_fields.add_row()
    row.cells[0].text = field
    row.cells[1].text = req
    row.cells[2].text = desc
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "13.3 Editing or Deleting a Book", level=2)
doc.add_paragraph("The process is the same as for products (see Section 12.3 and 12.4).")
add_bullet(doc, "Click the Edit (✏️) icon to update any book details")
add_bullet(doc, "Click the Delete (🗑️) icon and confirm to permanently remove a book")
add_bullet(doc, "To temporarily hide a book, set its status to 'Out of Stock'")

add_colored_heading(doc, "13.4 Status Tags — Quick Reference for Admin", level=2)
admin_tags = doc.add_table(rows=0, cols=2)
admin_tags.style = 'Table Grid'
hdr_at = admin_tags.add_row()
for i, txt in enumerate(["Status Tag", "When to Use It"]):
    hdr_at.cells[i].text = txt
    for para in hdr_at.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_at.cells[i], "D8590E")

tag_admin = [
    ("New Arrival", "When you just added a new book to the shop — helps customers spot new stock"),
    ("Most Popular", "For books that many customers ask about or browse frequently"),
    ("Best Seller", "Your top-selling books — creates urgency and social proof"),
    ("Limited Stock", "When you have very few copies left — encourages quick purchase decisions"),
    ("Out of Stock", "When the book is sold out — keeps it visible so customers can ask when it's back"),
]
alt = False
for tag, when in tag_admin:
    row = admin_tags.add_row()
    row.cells[0].text = tag
    row.cells[1].text = when
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

doc.add_page_break()

# ===================================================================
# SECTION 14 — OFFERS & BANNERS
# ===================================================================
add_colored_heading(doc, "14. Managing Offers & Banners", level=1)
add_horizontal_rule(doc)

add_colored_heading(doc, "14.1 Creating an Offer / Promotion", level=2)
add_step(doc, 1, "Go to Admin Dashboard → Offers", "Click 'Offers' or 'Banners' in the left sidebar.")
add_step(doc, 2, "Click 'Add Offer'", "Fill in the offer title, description, and optional image.")
add_step(doc, 3, "Set dates", "Optionally set a start and end date for the offer.")
add_step(doc, 4, "Click 'Save'", "The offer banner appears on the Home page.")

add_colored_heading(doc, "14.2 Managing the Announcement Banner", level=2)
doc.add_paragraph(
    "The announcement banner (top of the page) is controlled from Admin Dashboard → Settings → Announcement."
)
ann_steps = [
    ("Enable / Disable", "Toggle the banner on or off with a single switch"),
    ("Edit the Message", "Type your notice in the message field (keep it short — one sentence works best)"),
    ("Set Banner Type", "Choose 'Info' (blue) for general notices or 'Urgent' (red/amber) for closures"),
    ("Set Start/End Date", "Optional — the banner will auto-hide after the end date"),
    ("Dismissible", "Toggle whether customers can close the banner with an X"),
]
for title, desc in ann_steps:
    p = doc.add_paragraph(style='List Number')
    run_title = p.add_run(f"{title}: ")
    run_title.bold = True
    run_title.font.size = Pt(11)
    run_desc = p.add_run(desc)
    run_desc.font.size = Pt(11)

add_info_box(doc,
    "💡 Best practice: Turn off the announcement banner when there's no active notice. "
    "Leaving a stale message (e.g. a past closure date) confuses customers.")

doc.add_page_break()

# ===================================================================
# SECTION 15 — SHOP SETTINGS
# ===================================================================
add_colored_heading(doc, "15. Shop Settings & Configuration", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "All shop-specific details can be updated from Admin Dashboard → Settings without any coding. "
    "Changes take effect immediately across the entire website."
)

add_colored_heading(doc, "15.1 General Settings", level=2)
gen_table = doc.add_table(rows=0, cols=2)
gen_table.style = 'Table Grid'
hdr_gen = gen_table.add_row()
for i, txt in enumerate(["Setting", "Description"]):
    hdr_gen.cells[i].text = txt
    for para in hdr_gen.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_gen.cells[i], "1D9E75")

gen_settings = [
    ("Shop Name", "Your shop's display name (shown in header, footer, browser tab)"),
    ("Tagline", "A short slogan shown on the hero banner"),
    ("Logo", "Upload your shop logo (shown in header and footer)"),
    ("Favicon", "Small icon shown in browser tabs"),
    ("Currency", "Currency code (currently LKR for Sri Lankan Rupees)"),
    ("Locale", "Language/region for number formatting"),
]
alt = False
for setting, desc in gen_settings:
    row = gen_table.add_row()
    row.cells[0].text = setting
    row.cells[1].text = desc
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "15.2 Contact & Location Settings", level=2)
contact_settings = [
    ("Phone", "Shop phone number displayed on the Contact page and footer"),
    ("WhatsApp Number", "Number used for the WhatsApp floating button and enquiry links"),
    ("Email", "Shop email address for enquiries"),
    ("Address", "Full street address shown on the Contact page"),
    ("Google Maps URL", "Link to the shop on Google Maps (embedded in Contact page)"),
]
cst = doc.add_table(rows=0, cols=2)
cst.style = 'Table Grid'
hdr_cst = cst.add_row()
for i, txt in enumerate(["Setting", "Description"]):
    hdr_cst.cells[i].text = txt
    for para in hdr_cst.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_cst.cells[i], "D8590E")
alt = False
for setting, desc in contact_settings:
    row = cst.add_row()
    row.cells[0].text = setting
    row.cells[1].text = desc
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "15.3 Business Hours", level=2)
doc.add_paragraph(
    "Update your business hours from the Settings page:"
)
add_bullet(doc, "Monday – Friday: 8:30 AM – 6:30 PM (default)")
add_bullet(doc, "Saturday: 8:30 AM – 5:00 PM (default)")
add_bullet(doc, "Sunday: Closed (default)")
add_info_box(doc,
    "📅 If you have special hours for a public holiday, use the Announcement Banner "
    "to inform customers rather than changing the regular hours.")

add_colored_heading(doc, "15.4 Social Media Links", level=2)
doc.add_paragraph("Add or update your social media profile links:")
add_bullet(doc, "Facebook — e.g. https://facebook.com/yourshop")
add_bullet(doc, "Instagram — e.g. https://instagram.com/yourshop")
add_bullet(doc, "TikTok — e.g. https://tiktok.com/@yourshop")
add_bullet(doc, "YouTube — Optional")
add_bullet(doc, "WhatsApp Chat URL — Pre-filled link using wa.me format")
add_bullet(doc, "WhatsApp Default Message — The pre-filled text sent when customers tap the chat button")

add_colored_heading(doc, "15.5 Theme & Branding", level=2)
doc.add_paragraph(
    "Brand colors and font settings can be updated to match your brand. "
    "These changes affect the entire website immediately:"
)
add_bullet(doc, "Primary Color — Main brand color (buttons, links, highlights)")
add_bullet(doc, "Secondary Color — Accent color (badges, tags, highlights)")
add_bullet(doc, "Font Family — Currently Poppins (Google Fonts)")
add_bullet(doc, "Dark Mode Colors — Separate palette for dark mode")

doc.add_page_break()

# ===================================================================
# SECTION 16 — TROUBLESHOOTING
# ===================================================================
add_colored_heading(doc, "16. Troubleshooting", level=1)
add_horizontal_rule(doc)

trouble_table = doc.add_table(rows=0, cols=3)
trouble_table.style = 'Table Grid'
hdr_t = trouble_table.add_row()
for i, txt in enumerate(["Issue", "Possible Cause", "Solution"]):
    hdr_t.cells[i].text = txt
    for para in hdr_t.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_t.cells[i], "D8590E")

troubles = [
    ("Website won't open", "Internet connection issue or browser cache",
     "Check your internet connection. Try refreshing (Ctrl+R / Cmd+R). Try a different browser."),
    ("Images not loading", "Slow connection or Supabase Storage delay",
     "Wait a few seconds and refresh. Images load from cloud storage and may take a moment."),
    ("Can't log into Admin", "Wrong email/password or session expired",
     "Double-check credentials. Use 'Forgot Password' to reset. Clear browser cookies."),
    ("Product I added isn't showing", "Possible sync delay",
     "Refresh the storefront page. Changes usually appear within seconds."),
    ("WhatsApp button not working", "Incorrect WhatsApp number in settings",
     "Go to Settings and verify the WhatsApp number is correct (no spaces, include country code)."),
    ("Announcement banner not showing", "Banner is disabled in settings",
     "Go to Admin → Settings → Announcement and enable the banner toggle."),
    ("Dark mode not saving", "Browser cookies/local storage blocked",
     "Allow cookies for uniqueprinters.vercel.app in your browser settings."),
    ("Search not finding a product", "Product name doesn't match search term",
     "Try different keywords or browse by category instead."),
]
alt = False
for issue, cause, solution in troubles:
    row = trouble_table.add_row()
    row.cells[0].text = issue
    row.cells[1].text = cause
    row.cells[2].text = solution
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(9)
    alt = not alt

doc.add_page_break()

# ===================================================================
# SECTION 17 — FAQs
# ===================================================================
add_colored_heading(doc, "17. Frequently Asked Questions (FAQs)", level=1)
add_horizontal_rule(doc)

faqs = [
    ("Can I buy products online?",
     "No — this is a catalog/showcase website. Prices and availability are displayed online, "
     "but purchases are made in-store. You can enquire about products via WhatsApp before visiting."),
    ("How do I enquire about a product?",
     "Tap the WhatsApp button (floating bottom-right on every page) or the 'WhatsApp Enquiry' "
     "button on a product or book's detail page. A pre-filled message will be ready to send."),
    ("Is my personal information safe?",
     "The website uses Supabase for data security. Enquiry form data is stored securely. "
     "No payment information is collected as there is no online checkout."),
    ("How do I contact the shop?",
     "Visit the Contact page for the full address, phone number, WhatsApp link, business hours, "
     "and an online enquiry form."),
    ("Can I use the website in dark mode?",
     "Yes! Click the ☀️/🌙 toggle in the navigation bar to switch between light and dark mode."),
    ("How often are products and books updated?",
     "The shop owner manages products in real-time via the Admin Dashboard. "
     "New arrivals and stock updates appear immediately."),
    ("The book I want says 'Out of Stock' — will it come back?",
     "Ask via WhatsApp — the shop can let you know when it's back in stock."),
    ("Can I find the shop on Google Maps?",
     "Yes — the Contact page has an embedded map. Tap it to open Google Maps for directions."),
    ("What are the shop's opening hours?",
     "Monday–Friday: 8:30 AM–6:30 PM | Saturday: 8:30 AM–5:00 PM | Sunday: Closed. "
     "Check the Announcement Banner on the website for any special closure notices."),
    ("Who do I contact for website issues?",
     "Contact the website developer. For shop-related enquiries, use the WhatsApp button or the Contact page."),
]

for i, (q, a) in enumerate(faqs, 1):
    q_para = doc.add_paragraph()
    q_run = q_para.add_run(f"Q{i}: {q}")
    q_run.bold = True
    q_run.font.size = Pt(11)
    q_run.font.color.rgb = RGBColor(0xD8, 0x59, 0x0E)

    a_para = doc.add_paragraph()
    a_run = a_para.add_run(f"A: {a}")
    a_run.font.size = Pt(11)
    a_para.paragraph_format.left_indent = Inches(0.3)
    a_para.paragraph_format.space_after = Pt(8)

doc.add_page_break()

# ===================================================================
# SECTION 18 — CONTACT & SUPPORT
# ===================================================================
add_colored_heading(doc, "18. Contact & Support", level=1)
add_horizontal_rule(doc)

doc.add_paragraph(
    "For any questions about the website or its features, please use the contact details below."
)

add_colored_heading(doc, "18.1 Shop Contact", level=2)
support_table = doc.add_table(rows=0, cols=2)
support_table.style = 'Table Grid'
hdr_sup = support_table.add_row()
for i, txt in enumerate(["Contact Method", "Details"]):
    hdr_sup.cells[i].text = txt
    for para in hdr_sup.cells[i].paragraphs:
        for run in para.runs:
            run.bold = True
            run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    set_cell_bg(hdr_sup.cells[i], "1D9E75")

support_rows = [
    ("Phone", "+94 76 383 6945"),
    ("WhatsApp", "+94763836945 | https://wa.me/+94763836945"),
    ("Address", "No 571/2, Meegahagodalla, Thalduwa, Avissawella, Sri Lanka"),
    ("Website", "https://uniqueprinters.vercel.app/"),
    ("Contact Page", "https://uniqueprinters.vercel.app/contact"),
]
alt = False
for method, detail in support_rows:
    row = support_table.add_row()
    row.cells[0].text = method
    row.cells[1].text = detail
    bg = "F7F5F0" if alt else "FFFFFF"
    for c in row.cells:
        set_cell_bg(c, bg)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
    alt = not alt

add_colored_heading(doc, "18.2 Change Requests & Feedback", level=2)
doc.add_paragraph(
    "If you would like to request changes to this manual or to the website itself, please provide "
    "the following information to the developer:"
)
add_bullet(doc, "What needs to be changed (be as specific as possible)")
add_bullet(doc, "Which page or section of the website is affected")
add_bullet(doc, "Any reference images, links, or examples that help explain the change")
add_bullet(doc, "Priority level — Urgent / Normal / Low priority")

add_info_box(doc,
    "📝 This manual was prepared in October 2026. As new features are added to the website, "
    "the manual will be updated. Version 1.0.")

doc.add_paragraph()
doc.add_paragraph()

# Final centered message
final_para = doc.add_paragraph()
final_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
final_run = final_para.add_run(
    "— End of Unique Printers User Manual —\n"
    "Version 1.0 | https://uniqueprinters.vercel.app/"
)
final_run.font.size = Pt(11)
final_run.font.color.rgb = RGBColor(0xD8, 0x59, 0x0E)
final_run.bold = True

# -------------------------------------------------------------------
# SAVE
# -------------------------------------------------------------------
output_path = "/Users/afras/Documents/current_projects/UniquePrinters/MANUAL/Unique_Printers_User_Manual.docx"
doc.save(output_path)
print(f"✅ Manual saved to: {output_path}")

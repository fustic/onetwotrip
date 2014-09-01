OneTwoTrip
==============

Company website as a basic single-page application with auth mechanism.

Description
--------------
This SPA must consist of three simple pages:
  1. main page;
  2. contacts page;
  3. administrative dashboard.
  
The website content doesn’t matter. 
Pages must have common header with menu bar, which contains following sets of items that depend on user’s auth state:
  • for anonymous user: Main, Contacts and 'Sign in' links;
  • for authorised user: Main, Contacts, Admin links and 'Sign out' button.
  
'Sign in’ link opens auth form as an overlay. After successful credentials is entered, user must be redirected to Admin page. Entering the Admin page by anonymous user causes redirection to Main page with displayed auth form.

<%* const new_title = tp.date.now("YYYY-MM-DD") await tp.file.rename(new_title) _%>
<% "---" %>
title: <% new_title %>
aliases: []
author: [Nathan Krupa]
date created: <% tp.file.creation_date("dddd, MMMM Do YYYY") %>
date modified: <% tp.file.last_modified_date("dddd, MMMM Do YYYY") %>
tags: [FlashFiction writing/idea]
published:
publisher:
<% "---" %>
<% await tp.file.move("Writing/Flash Fiction/" + new_title) %>
[[Dashboard]] - [[In Box]] - [[flash fiction]]
Project Xanadu — Architecture Specification 

WBS 2.4 System Architecture · WBS 2.5 Enfilade Design 

Version: 1.0 

Date: 25 April 2026 

Classification: Operator-Grade Technical Specification 

1. Executive Summary 

This document provides a comprehensive, self-contained architecture specification for Project Xanadu, the hypertext system conceived by Ted Nelson in 1960. Project Xanadu predates and fundamentally differs from the World Wide Web: where the Web adopted one-way links, page-centric addressing, and content copying, Xanadu's architecture is built upon a radically different set of primitives collectively known as xanalogical structure. These primitives include permanent content addresses that never expire or change, inherently bidirectional links that allow any content to discover what references it, transclusion (virtual quotation by reference rather than copying, preserving attribution and enabling micropayment), and persistent versioning that guarantees every edit to every document is preserved in perpetuity. 

The specification covers two Work Breakdown Structure elements. WBS 2.4 (System Architecture) defines the structural layers of the system from the append-only permascroll storage layer through the enfilade engine, document model, front-end/back-end protocol, and presentation layer. It specifies the tumbler addressing system, the critical separation of invariant content space (I-space) from virtual document space (V-space), the system's non-negotiable architectural invariants, and the principal API surface. WBS 2.5 (Enfilade Design) defines the family of tree data structures—enfilades—that serve as the computational engine of the system. It covers enfilade theory (the DSP/WID duality), the specific enfilade types used in Xanadu (GRAN, POOM, SPAN, Historical Trace, and Linking), core operations (cut, splice, insert, delete, retrieve, version creation), the recursion model, and complexity analysis. 

This specification focuses primarily on the "Green" design era (1970s–1980s enfilade-based architecture developed at Xerox PARC and later), while noting conceptual extensions relevant to modern implementation. It is intended for third-party engineers, researchers, and system architects who require a complete technical understanding of the Xanadu architecture without reference to external materials. 

2. Scope and Definitions 

2.1 Scope Statement 

WBS 2.4 — System Architecture encompasses all structural layers of the Xanadu system, including: the five-layer architectural stack, the tumbler addressing scheme, the data model (permascroll, documents, versions, links, and transclusion), the I-space/V-space separation, the system's architectural invariants, and the interfaces and protocols (FeBe protocol and core API surface). This element defines what the system is and how its components relate. 

WBS 2.5 — Enfilade Design encompasses the data structure theory and implementation that powers WBS 2.4. This includes: the general enfilade theory (DSP/WID mechanics and their duality), the specific enfilade types deployed in the system (GRAN, POOM, SPAN, Historical Trace, Linking), all core operations (cut, splice, insert, delete, retrieve, version creation), the recursion model (structural recursion and poly-enfilade composition), and formal complexity analysis. This element defines how the system's data structures work at an algorithmic level. 

2.2 Glossary of Terms 

|   |   |
|---|---|
|Term|Definition|
|Docuverse|The universal address space containing all documents, versions, and links across all nodes in the Xanadu network. Every piece of content ever written exists at a permanent location within the docuverse.|
|Tumbler|A multi-part ordinal number composed of dot-separated unbounded integers, used as a permanent address for any object in the docuverse. Format: node.0.user.0.document.0.element. Tumblers support comparison, offset calculation, and range queries.|
|Permascroll|An append-only, read-only content store where all data receives permanently assigned addresses (permaddresses). Content written to the permascroll is never overwritten, modified, or deleted.|
|Transclusion|The inclusion of content from one document into another by reference rather than copying. The original source remains intact; attribution and version integrity are preserved across all transclusions.|
|Enfilade|A class of tree data structures (B-Tree-like) using DSPs (displacements) and WIDs (widths) for indexing, enabling efficient editing, versioning, retrieval, and inter-comparison in a hypertext database.|
|DSP (Displacement)|A relative key or offset representing the difference in key between a containing node and its subtree or leaf. The absolute key of any leaf is computed by combining all DSPs on the path from root to that leaf.|
|WID (Width)|A range, bounding box, or summary value relative to a subtree or leaf, identifying the interesting parts of sparsely populated address spaces. WIDs are combined upward from leaves through all layers to the root.|
|I-Space (Invariant Space)|The native byte-addressed content storage space. Content has fixed, immutable addresses in I-space; once a byte is written at a given I-space address, that mapping never changes.|
|V-Space (Virtual Space)|The user-facing document address space. V-space positions map to I-space addresses through the POOM enfilade. V-space addresses change when content is edited; I-space addresses do not.|
|Span|A contiguous range of addresses defined by a start position and a length, used to reference content in both I-space and V-space.|
|Xanalogical Structure|The combination of deep bidirectional links using permanent content addresses with transpointing windows for side-by-side comparison. This is the defining architectural paradigm of Xanadu.|
|Transcopyright|A proposed rights management mechanism where transclusion automatically triggers micropayment to the original content creator, enabling a new economic model for digital publishing.|
|FeBe Protocol|The front-end/back-end communication protocol used in Udanax Green, separating the presentation layer from the document model and storage layers.|

3. System Architecture (WBS 2.4) 

3.1 Architectural Overview 

The Xanadu system is organized as a five-layer vertical stack. Each layer has a clearly defined responsibility and communicates with adjacent layers through well-specified interfaces. The layers are ordered from the lowest-level persistent storage at Layer 1 to the highest-level user-facing presentation at Layer 5. 

|   |   |   |
|---|---|---|
|Layer|Name|Responsibility|
|5|Presentation Layer|Rendering, transpointing windows, side-by-side comparison views, user interaction|
|4|Protocol Layer (FeBe)|Front-end/back-end communication, request serialization, tumbler compression|
|3|Document Model Layer|Version management, document composition, link resolution, transclusion assembly|
|2|Enfilade Engine|Core data structure operations: GRAN, POOM, SPAN enfilades; cut/splice/query|
|1|Storage Layer (Permascroll)|Append-only persistent storage, I-space addressing, content immutability|

This layered separation of concerns ensures that each component can be reasoned about, tested, and potentially replaced independently. The Presentation Layer (5) is concerned exclusively with rendering and user interaction; it knows nothing about how content is stored or indexed. The Protocol Layer (4) serializes requests from the front end into a compact wire format and dispatches them to the back end. The Document Model Layer (3) orchestrates the high-level semantics of documents, versions, links, and transclusion, translating user-level operations into sequences of enfilade operations. The Enfilade Engine (2) provides the algorithmic core—all data structure manipulations (search, insert, delete, version creation) occur here. The Storage Layer (1) is the immutable foundation upon which everything else rests. 

Data flows downward on writes and upward on reads. When a user inserts text into a document, the request passes from Layer 5 through Layer 4 to Layer 3, which appends the raw bytes to the permascroll (Layer 1) and updates the POOM enfilade (Layer 2) to reflect the new V-space–to–I-space mapping. When a user reads a document, Layer 3 queries the POOM (Layer 2) to translate V-space positions to I-space addresses, then queries the GRAN (Layer 2) to retrieve the actual bytes from the permascroll (Layer 1), and returns the assembled content upward through Layer 4 to Layer 5 for rendering. 

Layers 1 and 2 are the primary subject of WBS 2.5 (Enfilade Design) and are specified in full detail in Section 4 of this document. Layers 3 through 5 are specified within WBS 2.4 and are covered in Sections 3.3 through 3.5. 

3.2 Tumbler Addressing System 

The tumbler is the fundamental addressing mechanism of the docuverse. A tumbler is a multi-part ordinal number composed of dot-separated unbounded integers. Unlike fixed-length addresses (such as 32-bit or 64-bit integers), tumblers have no upper bound on the number of components or the magnitude of any single component. This allows the address space to grow without limit and without reassignment of existing addresses. 

The tumbler structure follows a hierarchical pattern that encodes the organizational structure of the docuverse: 

Format: 1.node.0.user.0.document.0.element 

The digits 0 serve as level separators. The address hierarchy is: Node → Account → Document → Version → Element. Within the element space, data bytes occupy space 1.x and links occupy space 2.x. 

The baptism principle governs address allocation: whoever owns an address can create sub-addresses by appending digits, with no central coordination required. A node operator who owns address 1.23 can create accounts 1.23.0.1, 1.23.0.2, and so on without consulting any other node. Each account holder can create documents under their own account tumbler. This principle enables fully decentralized address allocation across the entire docuverse. 

Tumbler arithmetic supports comparison (determining which of two tumblers comes first in canonical order), offset calculation (computing the distance between two tumblers), and range queries (finding all tumblers within a specified range). These arithmetic operations are essential for efficient enfilade indexing. 

Important 

Time is not encoded in tumblers. Temporal metadata (creation time, modification time) is tracked separately. Tumblers are purely positional—they encode where something is in the docuverse, never what it is about or when it was created. 

Example: Consider the tumbler 1.23.0.4.0.17.3.0.1.39: 

|   |   |   |
|---|---|---|
|Component|Value|Meaning|
|1.23|Node 23|The 23rd node in the docuverse|
|.0.4|Account 4|The 4th account registered on node 23|
|.0.17|Document 17|The 17th document created by account 4|
|.3|Version 3|The 3rd version of document 17|
|.0.1.39|Data byte 39|The 39th byte in element space 1 (data)|

3.3 Data Model 

3.3.1 The Permascroll (Storage Layer) 

The permascroll is the foundational storage abstraction of the Xanadu system. It operates under strict append-only, read-only semantics: once content is written to the permascroll, it is never modified, overwritten, or deleted. Every byte appended to the permascroll receives a permanent address—a permaddress—in I-space. This permaddress is valid forever; no future operation can invalidate it or reassign it to different content. 

Content is stored as a linear stream. New bytes are always appended to the end of the stream, receiving the next available permaddress. All subsequent operations in the system—editing, linking, versioning, transclusion—work by reference to permascroll addresses rather than by manipulating the stored bytes directly. The permascroll itself is never modified after a write; it only grows. 

The permascroll provides four guarantees: permanent addressability (every byte has a globally unique, permanent address), content integrity (the content at any given address never changes), full history preservation (because nothing is ever deleted, the complete history of all content ever created is always available), and tamper evidence (any unauthorized modification would be detectable because downstream references would become inconsistent). 

Regarding physical versus logical organization: the permascroll may span multiple storage devices, partitions, or even geographically distributed nodes, but it presents a single, unified logical address space. The mapping from logical permaddresses to physical storage locations is an implementation detail invisible to all higher layers. 

3.3.2 Documents, Versions, and Links 

A document is a named collection of versions sharing the same owner (account). Documents are identified by tumbler addresses within their owner's account space. A document does not contain content directly; it contains versions. 

A version is a specific arrangement of content, represented by a version list (doclist) that maps V-space positions to I-space permaddresses. Each version defines how content from the permascroll is arranged to form the document as the user sees it. Versions are never overwritten; each edit creates a new version. This means the full edit history of every document is preserved as a sequence of addressable versions. 

Links are bidirectional, content-addressed connections stored in link space (element space 2.x within a document's tumbler hierarchy). Each link has three spans: a from-set (the source content), a to-set (the destination content), and a type specifier (categorizing the nature of the connection). Because links reference I-space permaddresses rather than V-space positions, they follow content through edits automatically. If a paragraph is moved from position 10 to position 500 in a document, links pointing to that paragraph's I-space address remain valid without any update. 

Transclusion is the mechanism by which documents compose content by referencing spans in other documents' I-space. The referenced content is not copied; it is presented by reference with full attribution. When a document transcludes a paragraph from another document, both documents' renderings display the same content, but only one copy exists in the permascroll. Changes to the original content are immediately visible in all documents that transclude it. 

3.3.3 The I-Space / V-Space Separation 

The separation of I-space and V-space is the most critical architectural decision in the Xanadu design. 

I-Space (Invariant Space) is the raw content layer. Addresses in I-space are permanent and immutable. Once a byte is written to I-space at a given permaddress, that mapping never changes. I-space is the domain of the permascroll and the GRAN enfilade. 

V-Space (Virtual Space) is the user-visible document layer. Addresses in V-space correspond to positions within a document version as the user sees them—for example, "character 50 in this document version." V-space addresses are ephemeral: when content is inserted before character 50, the content that was at position 50 moves to a higher position. V-space is the domain of the POOM enfilade. 

The POOM enfilade bridges V-space to I-space. When a user requests content at V-space position N, the POOM translates that position to the corresponding I-space permaddress, and the GRAN enfilade retrieves the actual bytes from that address. This indirection is what makes links permanent: links point to I-space addresses, so even when a document is extensively edited (changing all of its V-space mappings), the links still resolve correctly because the I-space addresses they reference have not changed. 

User requests V-space position 5         |         v   POOM Enfilade (V-space --> I-space mapping)         |         v   "Position 5 = I-space address X"         |         v   GRAN Enfilade (content storage)         |         v   Returns actual bytes from permaddress X 

3.4 System Invariants 

The following invariants are non-negotiable architectural constraints. Every component and every operation in the system must preserve all of these invariants at all times. 

1. Permanence of Content: Every byte written to the permascroll persists indefinitely. No delete or overwrite operation exists at the storage layer. Content may become unreferenced by any current document version, but it remains in the permascroll and addressable by its permaddress. 
    

2. Permanence of Address: Every tumbler address, once assigned, remains valid forever. New items are inserted by subdivision (appending digits to existing tumblers), never by reassignment of existing addresses. No address is ever reused for different content. 
    

3. Bidirectionality of Links: Every link is inherently two-way. If document A links to document B, document B can discover that link without any additional registration or notification mechanism. This is achieved by indexing links by their I-space spans in both directions. 
    

4. Content-Addressed Linking: Links reference I-space permaddresses, ensuring they survive all edits to the documents they connect. A link never becomes "broken" due to document editing because the content it points to never moves in I-space. 
    

5. Transclusion Integrity: Included content is always presented by reference to its original permascroll location. No silent copying occurs. The provenance of every byte displayed in any document is traceable to its original author and creation context. 
    

6. Version Completeness: Every version of every document is preserved and addressable. The full edit history is a first-class citizen of the system, not an optional feature. Any prior version can be retrieved and rendered at any time. 
    

7. Canonical Order: All changes leave the underlying data structures in canonical (balanced, consistent) order. This is an internal structural mandate ensuring that enfilades remain balanced and operation costs remain logarithmic regardless of edit history. 
    

3.5 Interfaces and Protocols 

3.5.1 FeBe Protocol 

The FeBe (Front-end/Back-end) Protocol separates the presentation layer from the document model and storage layers. The front end handles all user interaction and rendering; the back end handles all data management, enfilade operations, and persistent storage. This separation allows multiple front-end implementations (graphical, command-line, programmatic) to share a single back-end, and allows back-end implementations to evolve without affecting front-end code. 

Tumblers are transmitted in a compressed format to minimize wire overhead, taking advantage of the hierarchical structure of tumbler addresses (common prefixes are shared). The protocol is stateless per request: each request from the front end contains all information necessary for the back end to process it. The back end maintains all persistent state, including the permascroll, all enfilades, and all document metadata. 

Principal operations supported by the FeBe protocol include: creating documents and versions, inserting and retrieving content, creating and following links, finding links on a given span, and retrieving version lists. 

3.5.2 Core API Surface 

|   |   |   |   |
|---|---|---|---|
|Operation|Input|Output|Description|
|CreateDocument|account tumbler|document tumbler|Allocates a new document address under the specified account|
|CreateVersion|document tumbler|version tumbler|Creates a new version, initially empty or cloned from a prior version|
|InsertContent|version tumbler, position, byte stream|span|Appends bytes to permascroll; inserts corresponding span into the version's V-space at the given position|
|RetrieveSpan|version tumbler, V-space start, length|byte stream|Translates V-space range to I-space via POOM, retrieves bytes via GRAN|
|DeleteSpan|version tumbler, V-space start, length|void|Removes span from V-space mapping (content remains in permascroll)|
|CreateLink|from-span, to-span, type|link tumbler|Creates a bidirectional link between two content-addressed spans|
|FollowLinks|span (I-space)|list of link tumblers|Returns all links whose from-set or to-set intersects the given span|
|CompareVersions|version tumbler A, version tumbler B|diff structure|Identifies shared and divergent I-space spans between two versions|

4. Enfilade Design (WBS 2.5) 

4.1 Enfilade Theory 

4.1.1 Structural Principles 

An enfilade is not a single data structure but a class of tree data structures sharing a common set of structural principles. All enfilades are balanced trees (B-Tree-like) distinguished by two indexing mechanisms that operate in complementary directions: DSPs (displacements), which propagate context top-down from root to leaves, and WIDs (widths), which aggregate information bottom-up from leaves to root. 

DSPs encode the relative key of each node with respect to its parent. The absolute key of any leaf is computed by summing all DSPs on the path from root to that leaf. This means that changing a single DSP at any level implicitly changes the effective keys of every descendant—enabling O(1) bulk repositioning of entire subtrees. 

WIDs encode a range, bounding box, or summary value for each subtree. A node's WID summarizes the extent of all content contained in its descendants. WIDs are maintained incrementally: when a leaf changes, its WID is recomputed, and the change propagates upward through all ancestor nodes to the root. WIDs can overlap between sibling subtrees, which distinguishes enfilades from many conventional tree structures. 

This dual mechanism—top-down context imposition via DSPs combined with bottom-up summary aggregation via WIDs—is the defining innovation of the enfilade. Together, they enable O(log n) search, O(log n) editing, efficient versioning through subtree sharing, and fast inter-comparison of document versions. 

The name "enfilade" comes from the architectural term for a suite of rooms arranged in a row with aligned doors—data flows through the structure like sightlines through an enfilade of rooms. 

4.1.2 DSP Mechanics (Displacements) 

A DSP (displacement) is the difference in key between a containing node and its child. For any leaf node in the tree, its absolute key is computed by the formula: 

absolute_key = DSProot + DSPlevel1 + DSPlevel2 + … + DSPleaf 

DSPs can encode any context that is imposed top-down on subtrees: positional offset in a linear address space, coordinate displacement in a spatial address space, or version context in a temporal address space. The critical insight is that changing a single DSP at the top of a subtree implicitly changes the keys of all data underneath that subtree. This enables O(1) bulk repositioning: to move an entire subtree representing thousands of bytes to a new position, only one DSP value needs to change. 

DSPs also make subtree rearrangement efficient. When two subtrees need to be swapped or a subtree needs to be moved from one location to another, the operation involves only DSP adjustments at the roots of the affected subtrees, not modifications to the internal structure of the subtrees themselves. This property is essential for the cut and splice operations described in Section 4.3. 

4.1.3 WID Mechanics (Widths) 

A WID (width) specifies the range of addresses covering all items within a subtree, expressed relative to the key of the node that contains the WID. WIDs are maintained incrementally: each leaf node has a WID describing its own extent, and each internal node's WID is computed by combining the WIDs of its children. When a leaf changes, the WID update propagates upward through all ancestor nodes to the root. 

WIDs can contain various types of summary information depending on the enfilade type: simple ranges (start and end), totals, maxima, minima, or bounding boxes. In some enfilade types, the WIDs of sibling subtrees can overlap—meaning that a search query may need to descend into multiple sibling branches. This contrasts with conventional B-Trees, where key ranges of siblings are disjoint. 

The primary function of WIDs is search pruning. To find data within a given address range, the search algorithm examines the WIDs of child nodes and visits only those children whose WIDs intersect the query range. In sparsely populated address spaces (such as the docuverse's tumbler space), this pruning is extremely effective, allowing the system to skip over vast empty regions of the address space in O(log n) time. 

4.1.4 The DSP/WID Duality 

DSPs and WIDs form a complementary pair that gives enfilades their unique power: 

- DSPs flow downward (context imposition): they tell each subtree where it sits relative to its parent. 
    

- WIDs flow upward (summary aggregation): they tell each parent what range of data its subtree contains. 
    

Together, they enable: O(log n) search (WIDs prune the search space; DSPs compute absolute positions), O(log n) editing (cut and splice operate by adjusting DSPs and recomputing WIDs along a single path), efficient versioning (subtrees can be shared between version trees because DSPs and WIDs are relative, not absolute), and subtree sharing (the relative nature of both mechanisms means a subtree can appear in multiple contexts without modification). 

The relative nature of both DSPs and WIDs is the key to the entire Xanadu versioning strategy. Because neither DSPs nor WIDs encode absolute positions, a subtree can be "borrowed" by a new version tree simply by creating a new parent node that points to the existing subtree with an appropriate DSP. The subtree itself is not copied; only the path from the new root to the shared subtree is newly created. 

4.2 Enfilade Types in Xanadu 

|   |   |   |   |
|---|---|---|---|
|Type|Full Name|Purpose|Address Space|
|GRAN|Granfilade|Stores actual content (raw bytes)|I-space (native bytes)|
|POOM|Positional Enfilade|Maps V-space positions to I-space addresses|V-space → I-space|
|SPAN|Span Enfilade|Stores and indexes span ranges|Used by both GRAN and POOM|

4.2.1 GRAN (Granfilade) — "The Model T" 

The GRAN (Granfilade) is the original enfilade design, nicknamed "The Model T" by Nelson as the first of the enfilade family. Its purpose is to store the actual content bytes in I-space. Leaves of the GRAN contain raw data—text bytes, binary content, or any other byte-level payload. DSPs in the GRAN encode I-space byte offsets: the absolute I-space address of any leaf is the sum of all DSPs from root to that leaf. WIDs encode the byte range covered by each subtree, enabling efficient range retrieval. 

The GRAN supports two principal operations: append (writing new content to the end of the permascroll, assigning the next available I-space address) and retrieve (fetching bytes by I-space address range). Because the permascroll is append-only, the GRAN never performs in-place updates—new content is always appended, and the tree grows rightward. 

4.2.2 POOM (Positional Enfilade) — "Eye in the Pyramid" 

The POOM (Positional Enfilade) was designed by Bill Barus; Nelson called it "the eye in the pyramid." Its purpose is to map V-space document positions to I-space permascroll addresses. This is the enfilade that makes editing efficient: when content is inserted into or deleted from a document, only the POOM needs updating—the GRAN and the permascroll remain unchanged. 

DSPs in the POOM encode V-space positional offsets. WIDs encode the V-space range mapped by each subtree. Leaves contain I-space address references—pointers into the GRAN that specify which permascroll bytes appear at each V-space position. 

The key innovation of the POOM is that it bridges the gap between the two address spaces. Links reference I-space addresses (permanent), but users interact with V-space positions (which change with every edit). The POOM maintains the mapping that allows the system to translate between these two spaces in O(log n) time. When a user edits a document, the POOM is updated to reflect the new arrangement, but because the links reference I-space (not V-space), they remain valid without any modification. 

4.2.3 SPAN Enfilade 

The SPAN enfilade stores contiguous address ranges (start, length) rather than individual elements. It is used to efficiently represent and query ranges in both I-space and V-space. By operating on spans rather than individual bytes, the SPAN enfilade enables efficient operations on large contiguous blocks without per-byte overhead. A document containing 10,000 contiguous bytes from the permascroll can be represented as a single span rather than 10,000 individual leaf nodes. 

4.2.4 Historical Trace Enfilade 

The Historical Trace enfilade, described by Nelson, is designed for version history tracking. It enables traversal of the full edit history of a document, allowing reconstruction of any prior version state. By indexing the sequence of edit operations and their effects on the POOM, the Historical Trace enfilade provides an efficient mechanism for navigating the version history without reconstructing each version from scratch. 

4.2.5 Linking Enfilade 

The Linking enfilade, designed by Barus, indexes links by I-space span. This enables efficient "find all links on this content" queries, which are essential for bidirectional link discovery. When a user views a document and the system needs to display all links pointing to or from any content in the visible window, the Linking enfilade can resolve this query in O(log n + k) time, where k is the number of matching links. 

4.3 Enfilade Operations 

4.3.1 Cut Operation 

The cut (split) operation divides the tree along a relevant access path, creating two or more independent subtrees at the split point. The operation descends from the root to the split position, guided by DSPs and WIDs, and creates new internal nodes along the path where the tree is divided. Nodes not on the cut path are shared between the resulting subtrees without copying. The cost of a cut in a 1-D enfilade is O(log n), proportional to the height of the tree. The cut is used as the first step of insert, delete, and rearrange operations. 

4.3.2 Splice Operation 

The splice (join) operation joins two or more subtrees back together after a cut. The operation creates new internal nodes to connect the subtrees, rebalances the tree according to B-Tree balancing rules, and updates WIDs along the join path to reflect the combined contents. The cost of a splice in a 1-D enfilade is O(log n). 

4.3.3 Insert 

To insert new content at a given position in a document: 

8. Cut the tree at the insertion point, producing a left subtree and a right subtree. 
    

9. Create a new leaf (or subtree) for the inserted content, with appropriate DSP and WID values. 
    

10. Splice the pieces together: left subtree + new content + right subtree. 
    

11. Update DSPs and WIDs along the affected paths to maintain consistency. 
    

The total cost is O(log n): one cut and one splice, each O(log n). 

4.3.4 Delete 

To delete a range of content from a document's V-space: 

12. Cut the tree at the start of the deletion range (first cut). 
    

13. Cut the right portion at the end of the deletion range (second cut), isolating the middle subtree. 
    

14. Discard the middle subtree from the V-space mapping. The content itself remains in I-space and the permascroll—only the V-space reference is removed. 
    

15. Splice the remaining left and right pieces together. 
    

16. Update DSPs and WIDs along the affected paths. 
    

The total cost is O(log n): two cuts and one splice. 

4.3.5 Retrieve (Range Query) 

To retrieve all content within a V-space range: 

17. Start at the root; compare the query range against the WIDs of child nodes. 
    

18. Descend into children whose WIDs intersect the query range, skipping those that do not. 
    

19. Accumulate DSPs along the descent path to compute absolute keys for each visited node. 
    

20. Collect matching leaves whose absolute keys fall within the query range. 
    

The cost is O(log n + k), where k is the number of matching elements. The log n component covers the descent to the first matching leaf; the k component covers the collection of all matches. 

4.3.6 Version Creation (Copy-on-Write) 

Creating a new version of a document exploits the relative nature of DSPs and WIDs to share subtrees between the original and new version trees: 

21. Share: The new version's root initially points to the same subtrees as the original version. No data is copied. 
    

22. Copy-on-write: When the new version is edited, new nodes are created only along the cut paths (the paths from root to the points of change). All other subtrees remain shared. 
    

23. Preservation: The original version's tree remains completely intact and unmodified. It can be retrieved and rendered at any time. 
    

The storage cost of a new version is proportional only to the number of changes, not to the size of the document. A single-character edit to a million-character document creates O(log n) new nodes—the rest of the tree is shared. Both old and new version trees remain balanced and offer full O(log n) performance for all operations. 

4.4 Recursion Model 

4.4.1 Structural Recursion 

Enfilades exhibit structural recursion: every subtree of an enfilade is itself a valid enfilade. The DSP/WID properties hold at every level of the tree, from the root down to individual leaves. All operations—cut, splice, search—are defined recursively: each operation decomposes into the same operation applied to subtrees. This recursive self-similarity is not merely an implementation convenience; it is a fundamental structural property that enables the "poly-enfilade" concept. 

4.4.2 Poly-Enfilade Structures 

Nelson described "a whole universe of poly-enfilade structures." Poly-enfilades are compositions of enfilades: the leaves of one enfilade reference the roots of other enfilades, creating layered data structures with multiple levels of indirection. 

The POOM→GRAN relationship is the primary example. POOM leaves contain I-space addresses that serve as keys into the GRAN. A V-space query first traverses the POOM to obtain an I-space address, then traverses the GRAN to obtain the actual bytes. This two-level composition allows the system to maintain two independent address spaces (V-space and I-space) with different semantics (mutable arrangement vs. immutable content) while keeping both efficiently indexed. 

This composition principle extends to arbitrary depth. New enfilade layers can be added to index new types of queries (temporal, spatial, semantic) without modifying existing layers. Nelson described this extensibility as enabling "infinite scalability"—the architecture can accommodate new requirements by adding new enfilade layers rather than redesigning existing structures. 

4.4.3 Complexity Analysis 

|   |   |   |   |
|---|---|---|---|
|Operation|1-D Enfilade|2-D Enfilade|Notes|
|Search|O(log n)|O(√n) to O(log n)|Depends on WID overlap|
|Insert|O(log n)|O(√n) to O(log n)|Cut + splice|
|Delete|O(log n)|O(√n) to O(log n)|Double cut + splice|
|Version (copy)|O(log n)|O(log n)|Path-copy only|
|Bulk reposition|O(1)|O(1)|Single DSP change|

For 1-D enfilades (linear text, sequential addresses), all editing operations achieve logarithmic cost. This is because WIDs in 1-D spaces form disjoint ranges, so search never needs to visit more than one child at each level, and cut/splice operations follow a single root-to-leaf path. 

For 2-D enfilades (spatial data, overlapping WIDs), costs range between logarithmic and square-root depending on the degree of WID overlap between sibling subtrees. In the worst case—where all sibling WIDs overlap extensively—a search may need to visit multiple children at each level, degrading toward O(√n). In practice, with well-distributed data, performance remains closer to O(log n). 

5. Governance Surfaces 

5.1 Rights and Attribution 

Transcopyright is the rights management mechanism built into the architecture. Because transclusion works by I-space reference rather than by copying, the system can automatically detect when content from one author appears in another author's document and trigger micropayment to the original content creator. This is not an afterthought layered on top of the system; it is a direct consequence of the architectural decision to use reference rather than copying. 

Attribution is structural, not metadata. Because every transcluded span references a specific I-space permaddress, and every permaddress is assigned to a specific account within a specific node, the original authorship of any content is always traceable through the permascroll. There is no separate attribution database that could become inconsistent with the actual content; the attribution is the address itself. 

Rights travel with content: since content is never copied (only referenced), rights management is inherently centralized at the permascroll level. There is no need for Digital Rights Management (DRM) overlays or watermarking—the architecture itself enforces the connection between content and its creator. 

5.2 Access Control 

Access control in Xanadu follows the tumbler hierarchy. Each document belongs to an account, and each account belongs to a node. The tumbler hierarchy provides a natural access control boundary: node operators can set policies on their subtree of the docuverse, account holders control access to their documents, and document-level permissions can be specified within the document's tumbler space. 

The baptism principle (Section 3.2) ensures that address allocation and access control are decentralized: each node operates autonomously within its portion of the tumbler space. 

5.3 Auditability 

The append-only permascroll provides a complete, immutable audit trail. Because content is never modified or deleted, the full history of all actions is permanently recorded. Every version of every document is preserved, providing a complete edit history. Link creation and modification history is fully traceable through the link space. 

The system is inherently tamper-evident: any unauthorized modification to the permascroll would invalidate downstream references (POOM entries pointing to altered I-space addresses would return incorrect content, and WID/DSP consistency checks would fail). This makes the Xanadu architecture suitable for applications requiring non-repudiation and verifiable provenance. 

6. Design Principles 

The following principles, articulated by Ted Nelson, drove every architectural decision in the Xanadu system: 

24. Permanence: Nothing is ever lost. Every piece of content, every version, every link persists indefinitely. The permascroll's append-only semantics and the tumbler's permanent addressing are direct expressions of this principle. 
    

25. Bidirectionality: All connections are two-way. Any content can discover what references it. This is achieved through the Linking enfilade's indexing of links by both from-span and to-span. 
    

26. Transclusion over Copying: Content is used by reference, never duplicated. This preserves attribution, enables micropayment via transcopyright, and eliminates the version-synchronization problems inherent in copying. 
    

27. Deep Addressability: Every byte, every link, every version has a unique, permanent, globally resolvable address. The tumbler addressing system provides unbounded address depth through the baptism principle. 
    

28. Separation of Content and Arrangement: Content lives in I-space (immutable); arrangement lives in V-space (mutable). This is the fundamental architectural insight of the Xanadu design and the reason links survive edits. 
    

29. Infinite Scalability: The architecture must accommodate unlimited text, unlimited links, and unlimited changes while remaining responsive. The poly-enfilade composition model and logarithmic operation costs are designed to meet this requirement. 
    

30. Intertwingularity: Nelson's coined term: "Everything is deeply intertwingled." The architecture must support arbitrary cross-linking without hierarchical constraints. Any content can link to any other content, regardless of document boundaries, account boundaries, or node boundaries. 
    

31. Appendices 

Appendix A: Enfilade Pseudocode 

Retrieve (Range Query): 

FUNCTION retrieve(node, queryStart, queryEnd, accumulatedDSP):     absoluteKey = accumulatedDSP + node.dsp     IF node is leaf:         IF absoluteKey >= queryStart AND absoluteKey <= data-id="494" queryEnd:             RETURN [node.data]         ELSE:             RETURN []     results = []     FOR each child in node.children:         childAbsoluteKey = absoluteKey + child.dsp         IF child.wid intersects range [queryStart, queryEnd]:             results += retrieve(child, queryStart, queryEnd, absoluteKey)     RETURN results 

Cut (Split): 

FUNCTION cut(node, position, accumulatedDSP):     absoluteKey = accumulatedDSP + node.dsp     IF node is leaf:         RETURN split leaf at position relative to absoluteKey     Find child whose WID contains position     (leftChild, rightChild) = cut(child, position, absoluteKey)     leftTree = node with children up to and including leftChild     rightTree = node with children from rightChild onward     Update WIDs for leftTree and rightTree     RETURN (leftTree, rightTree) 

Splice (Join): 

FUNCTION splice(leftTree, rightTree):     Create new root node     Set root.children = [leftTree, rightTree]     root.dsp = 0     Rebalance if necessary (B-Tree balancing rules)     Recompute root.wid from children's WIDs     RETURN root 

Version Creation (Copy-on-Write): 

FUNCTION createVersion(originalRoot):     newRoot = shallowCopy(originalRoot)     // Both newRoot and originalRoot share all subtrees     // Edits to the new version will copy-on-write along cut paths     RETURN newRoot 

Appendix B: Tumbler Address Examples 

|   |   |
|---|---|
|Tumbler|Meaning|
|1.23|Node 23 in the docuverse|
|1.23.0.4|Account 4 on node 23|
|1.23.0.4.0.17|Document 17 belonging to account 4 on node 23|
|1.23.0.4.0.17.3|Version 3 of document 17|
|1.23.0.4.0.17.3.0.1.39|The 39th data byte in version 3 of document 17|
|1.23.0.4.0.17.3.0.2.4|The 4th link in version 3 of document 17|

Appendix C: Cross-Reference to WBS 

|   |   |   |
|---|---|---|
|WBS|Element|Document Sections|
|2.4|System Architecture|Sections 3.1 through 3.5|
|2.4.1|Architectural Layers|Section 3.1|
|2.4.2|Tumbler Addressing|Section 3.2|
|2.4.3|Data Model|Section 3.3|
|2.4.4|System Invariants|Section 3.4|
|2.4.5|Interfaces and Protocols|Section 3.5|
|2.5|Enfilade Design|Sections 4.1 through 4.4|
|2.5.1|Enfilade Theory|Section 4.1|
|2.5.2|Enfilade Types|Section 4.2|
|2.5.3|Enfilade Operations|Section 4.3|
|2.5.4|Recursion Model|Section 4.4|

— End of Document —
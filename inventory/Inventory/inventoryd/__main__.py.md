"""
inventoryd CLI entrypoint.

Prototype invariant:
    This entrypoint remains thin and delegates to cli.commands.
"""

import argparse
from .cli.commands import cmd_scan, cmd_diff


def main() -> None:
    parser = argparse.ArgumentParser(prog="inventoryd")
    sub = parser.add_subparsers(dest="command", required=True)

    scan_p = sub.add_parser("scan", help="scan and persist a snapshot")
    scan_p.add_argument("--root", required=True, help="snapshot storage directory")

    diff_p = sub.add_parser("diff", help="diff two snapshots")
    diff_p.add_argument("--root", required=True)
    diff_p.add_argument("--old", required=True, help="old snapshot timestamp")
    diff_p.add_argument("--new", required=True, help="new snapshot timestamp")

    args = parser.parse_args()

    if args.command == "scan":
        cmd_scan(args.root)
    elif args.command == "diff":
        cmd_diff(args.root, args.old, args.new)


if __name__ == "__main__":
    main()

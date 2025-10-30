#!/usr/bin/env bash
set -euo pipefail

# 環境設定
EXPECTED_VERSION="v2025-11-15"
BASE_DIR="public/legal/gungun/${EXPECTED_VERSION}"
LATEST_PATH="https://ruriandfox.com/legal/gungun/latest"

FILES=("terms.pdf" "privacy.pdf")

if [[ ! -d "${BASE_DIR}" ]]; then
  echo "ERROR: ${BASE_DIR} が存在しません。" >&2
  exit 1
fi

for filename in "${FILES[@]}"; do
  local_file="${BASE_DIR}/${filename}"
  if [[ ! -f "${local_file}" ]]; then
    echo "ERROR: ${local_file} が存在しません。" >&2
    exit 1
  fi

  local_hash="$(sha256sum "${local_file}" | awk '{print $1}')"

  # HEAD リクエストでリダイレクト先を確認
  head_response="$(curl -Is "${LATEST_PATH}/${filename}" | tr -d '\r')"
  redirect_target="$(printf '%s\n' "${head_response}" | awk -F': ' 'tolower($1)=="location" {print $2; exit}')"

  if [[ -n "${redirect_target}" ]]; then
    case "${redirect_target}" in
      "/legal/gungun/${EXPECTED_VERSION}/${filename}"|\
      "https://ruriandfox.com/legal/gungun/${EXPECTED_VERSION}/${filename}")
        ;;
      *)
        echo "ERROR: ${LATEST_PATH}/${filename} の Location ヘッダが想定外です (${redirect_target})。" >&2
        exit 1
        ;;
    esac
  fi

  tmpfile="$(mktemp)"
  curl -fsSL "${LATEST_PATH}/${filename}" -o "${tmpfile}"
  remote_hash="$(sha256sum "${tmpfile}" | awk '{print $1}')"
  rm -f "${tmpfile}"

  if [[ "${local_hash}" != "${remote_hash}" ]]; then
    echo "ERROR: ${filename} のハッシュ値が一致しません。" >&2
    echo "  local : ${local_hash}" >&2
    echo "  remote: ${remote_hash}" >&2
    exit 1
  fi
done

echo "OK: 最新リンクは ${EXPECTED_VERSION} の PDF と整合しています。"
